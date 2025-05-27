import { response, Router } from 'express';
import Joi from 'joi';
import { addUserSchema, addUsersSchema } from '../../services/validators';
import requireJwtAuth from '../../middleware/requireJwtAuth';
//import User from '../../models/User';
import Role from '../../models/Role';
import GameHistory from '../../models/GameHistory';
import Betting from '../../models/Betting';
import { checkpermission, verifyToken, treeUnderUser } from '../../helper/common';
import fileGetContents from 'file-get-contents'

let logger = require('../../services/logger');

const router = Router();
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Get current user coins.
 */
router.get('/usercoins', requireJwtAuth, async (req, res) => {
  let authstatus = await verifyToken(req);
  if (authstatus.status == 0) {
    return res.status(403).json(authstatus);
  }

  let permission = await checkpermission(req.user.role.id, 'usercoins');
  if (permission.status == 0) {
    return res.status(403).json(permission);
  }

  try {
    
    let response = {};
    
    response.coins = req.user.coins;
    response.betting = 0;

    let d = new Date();

    const gameHistory = await GameHistory.find({
      game: ObjectId(req.user.current_game),
      start: {
        $lte: d.toISOString(),
      },
      end: {
        $gt: d.toISOString(),
      },
    }).exec();

    if (gameHistory.length) {
      let gameHistoryId = gameHistory[0]._id;

      // Get the current betting sum
      const agg = await Betting.aggregate([
        {
          $match: {
            user: ObjectId(req.user.id),
            game_history: ObjectId(gameHistoryId),
            status: 'completed',
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: '$amount',
            },
          },
        },
      ]).exec();

      if (agg.length > 0) {
        if (agg[0].total !== undefined) {
          response.betting = agg[0].total;
        }
      }
    }

    res.json(response);
  } catch (err) {
    logger.error(err.message, {metadata: err});
    res.status(500).json({
      error: err.message || err.toString(),
    });
  }
});

/**
 * Post request to get all users data by roles
 */
router.post('/byrole', requireJwtAuth, async (req, res) => {
  let authstatus = await verifyToken(req);
  if (authstatus.status == 0) {
    return res.status(403).json(authstatus);
  }

  //console.log(req.user);

  let permission = await checkpermission(req.user.role.id, 'byrole');
  // if (permission.status == 0) {
  //   return res.status(403).json(permission);
  // }

  try {
    let roleId = req.body.role;

    let filters = {};
    let userId = req.body.userid;
    let usersname = req.body.searchusername;
    let perPage = 20, page = parseInt(req.body.currentPage);

    if (usersname == '') {
      return res.status(500).json({
        'message': 'please enter username'
      });
    }

    // let skip = page * limit;

    //req.user.id;
    const currentUserId = req.user.id;
    const user = req.user;
    const currentUserRole = user.role.id;
    let allChild;

    if (currentUserRole == 2) {
      allChild = await treeUnderUser(currentUserId);

      filters._id = { $in: allChild };
    }

    if (roleId == 2 || roleId == 3) {
      const role = await Role.findOne({
        id: roleId,
      });
      filters.role = role._id;
    }

    if (currentUserRole == 1) {
      if (userId) {
        let userCheck = await User.findById({ _id: userId }).populate('role').exec();
        if (userCheck.role.id == 3) {
          filters._id = userCheck;
        } else if (userCheck.role.id == 2) {
          allChild = await treeUnderUser(userId);

          filters._id = { $in: allChild };
        }
      }
    }


    if (usersname && user.role.id != 3) {

      let selectUser = await User.findOne({
        'username': usersname
      }, '_id').exec();

      if (!selectUser) {
        response.message = 'Please try with different username. This name does not exists';
        return res.send(response);
      }
      if (selectUser) {


        if (user.role.id == 2) {

          if (!allChild.includes(selectUser.id)) {

            response.message = 'user does not exist under this agent';
            return res.status(500).json({
              'message': 'user not found'
            });
          }
        }

        filters = {
          _id: ObjectId(selectUser.id)
        }

      }
    }

    filters.username = { $ne: 'masteradmin' }

    const users = await User.find(filters).limit(perPage).skip(page * perPage)
      .sort({
        updatedAt: 'desc',
      })
      .populate('role')
      .populate('parent');

    res.json({ roleId, users })

    // res.json({
    //   users: users.map((m) => {
    //     return m.toJSON();
    //   }),
    // });
  } catch (err) {
    logger.error(err.message, {metadata: err});
    res.status(500).json({
      error: err.message || err.toString(),
    });
  }
});

/**
 * Post request to get all users data by roles
 */
 router.get('/allagents', requireJwtAuth, async (req, res) => {
  let authstatus = await verifyToken(req);
  if (authstatus.status == 0) {
    return res.status(403).json(authstatus);
  }

    try {
    let filters = {};
    
    const role = await Role.findOne({
        id: 2,
      });
      filters.role = role._id;
    
    //req.user.id;
    const currentUserId = req.user.id;
    const user = req.user;
    const currentUserRole = user.role.id;
    let allChild;

    if (currentUserRole == 2) {
      allChild = await treeUnderUser(currentUserId);

      filters._id = { $in: allChild };
    }

    filters.username = { $ne: 'masteradmin' }

    const users = await User.find(filters)
      .sort({
        updatedAt: 'desc',
      });

    res.json({ users })

    // res.json({
    //   users: users.map((m) => {
    //     return m.toJSON();
    //   }),
    // });
  } catch (err) {
    logger.error(err.message, {metadata: err});
    res.status(500).json({
      error: err.message || err.toString(),
    });
  }
});

/**
 *
 */
router.get('/gamehistory/:gamehistoryid', requireJwtAuth, async (req, res) => {
  let authstatus = await verifyToken(req);
  if (authstatus.status == 0) {
    return res.status(403).json(authstatus);
  }

  let permission = await checkpermission(req.user.role.id, 'gameHistory');
  if (permission.status == 0) {
    return res.status(403).json(permission);
  }

  // Default response
  let response = {
    status: 0,
    message: 'Issue in user game history',
  };

  const user = req.user;

  if (user.role.id != 1) {
    return res.status(500).json({ status: 0, message: 'Restricted area only for admin' });
  }

  try {
    const currentUserRole = user.role.id;

    let gameHisotyId = req.params.gamehistoryid;
    if (gameHisotyId) {
      if (currentUserRole == 1) {
        let gameHistory = await GameHistory.findById(gameHisotyId).exec();

        response.totalBetting = gameHistory.total_betting;
        response.totalWinning = gameHistory.total_winning;
        response.start = gameHistory.start;
        response.end = gameHistory.end;

        let bettings = await Betting.find({
          game_history: ObjectId(gameHisotyId),
          status: 'completed',
        })
          .populate('user')
          .exec();

        response.users = {};

        for (let singleBet of bettings) {
          if (response.users[singleBet.user.username] === undefined) {
            response.users[singleBet.user.username] = {};
            response.users[singleBet.user.username]['username'] = singleBet.user.username;
          }

          response.users[singleBet.user.username]['userid'] = singleBet.user._id;

          if (response.users[singleBet.user.username]['betamount'] !== undefined) {
            response.users[singleBet.user.username]['betamount'] =
              response.users[singleBet.user.username]['betamount'] + singleBet.amount;
          } else {
            response.users[singleBet.user.username]['betamount'] = singleBet.amount;
          }

          if (singleBet.win_status) {
            if (response.users[singleBet.user.username]['winning'] !== undefined) {
              response.users[singleBet.user.username]['winning'] =
                response.users[singleBet.user.username]['winning'] + singleBet.winning;
            } else {
              response.users[singleBet.user.username]['winning'] = singleBet.winning;
            }
          }
        }

        response.users = Object.values(response.users);
        response.message = '';
        response.status = 1;
      } else {
        response.message = 'This area is restricted for other users';
      }
    } else {
      response.message = 'Please provide the game history id';
    }

    res.status(response.status == 1 ? 200 : 500).json(response);
  } catch (err) {
    logger.error(err.message, {metadata: err});
    // Set error message
    response.message = err.message || err.toString();
    res.status(500).json(response);
  }
});

router.get('/me', requireJwtAuth, (req, res) => {
  let permission = checkpermission(req.user.role.id, 'userMe');
  if (permission.status == 0) {
    return res.status(403).json(permission);
  }

  const me = req.user;
  res.json({ me });
});

// Users Inactive for 7 days
router.get('/inactive/:currentPage', requireJwtAuth, async (req, res) => {
  let authstatus = await verifyToken(req);
  if (authstatus.status == 0) {
    return res.status(403).json(authstatus);
  }

  let permission = await checkpermission(req.user.role.id, 'inactiveUser');
  if (permission.status == 0) {
    return res.status(403).json(permission);
  }

  try {
    const user = await req.user.getUserWithRole(req.user);

    if (user.role.id != 1) {
      return res.status(500).json({ status: 0, message: 'Restricted area only for admin' });
    }

    let backDate = new Date(new Date().setDate(new Date().getDate() - 7));
    let perPage = 20, page = parseInt(req.params.currentPage);

    const inacUser = await User.find(
      {
        updatedAt: {
          $lte: backDate,
        },
      },
      {
        _id: 0,
        coins: 1,
        username: 1,
        updatedAt: 1,
      })
      .limit(perPage).skip(page * perPage)
      .sort({
        updatedAt: 'desc',
      })
      .exec();

    res.status(200).json(inacUser);
  } catch (err) {
    logger.error(err.message, {metadata: err});
    res.status(500).json({
      message: 'Issue in inactive user API.',
    });
  }
});
/**
 * Get the specific user data
 */
router.get('/:id', requireJwtAuth, async (req, res) => {
  let authstatus = await verifyToken(req);
  if (authstatus.status == 0) {
    return res.status(403).json(authstatus);
  }

  // let permission = await checkpermission(req.user.role.id,'userList');
  // if( permission.status == 0 ) {
  //   return res.status(403).json(permission);
  // }

  if (req.user.role.id == 3 && req.params.id != req.user.id) {
    return res.status(403).json({ messsage: 'Your are not allowed to access this information' });
  }

  // Todo condition for agent role here

  try {
    var user = await User.findById(req.params.id).populate('role');
    if (!user)
      return res.status(404).json({
        message: 'User does not exists in our records.',
      });
    res.json({
      user: user.toJSON(),
    });
  } catch (err) {
    logger.error(err.message, {metadata: err});
    res.status(500).json({
      message: err,
    });
  }
});

/**
 * Get wallet balance
 */
router.get('wallet/:id', requireJwtAuth, async (req, res) => {
  let authstatus = await verifyToken(req);
  if (authstatus.status == 0) {
    return res.status(403).json(authstatus);
  }

  let permission = await checkpermission(req.user.role.id, 'usercoins');
  if (permission.status == 0) {
    return res.status(403).json(permission);
  }

  try {
    var user = await User.findById(req.params.id, 'coins').exec();
    if (!user)
      return res.status(404).json({
        message: 'Isse in checking Wallet balance API.',
      });
    res.json({
      user: user,
    });
  } catch (err) {
    logger.error(err.message, {metadata: err});
    res.status(500).json({
      message: err,
    });
  }
});

/**
 * Create new user.
 */
router.post('/', requireJwtAuth, async (req, res) => {
  let permission = await checkpermission(req.user.role.id, 'addUser');
  if (permission.status == 0) {
    return res.status(403).json(permission);
  }

  const user = req.user;


  if (user.role.id == 1 || user.role.id == 2) {
    const { error } = Joi.validate(req.body, addUserSchema);
    if (error) {
      return res.status(422).send({
        message: error.details[0].message,
      });
    }

    try {
      // Default response
      let response = {
        responseStatus: 422,
        status: 0,
        message: 'Issue in user inserting request',
        key: '',
      };

      if (user.role.id == 2 && req.body.commission > user.commission) {
        response.message = 'You can not enter more than your commission ' + user.commission;
        response.key = 'commission';
        return res.status(500).json(response);
      }

      /*
      if (user.role.id == 2 && req.body.commission < 4) {
        response.massage = 'You can not Enter Less than 4% commission to Customer';
        response.key = 'commission';
        return res.status(500).json(response);
      }*/

      if (req.body.role) {
        // Check user is already exists by username
        let checkUserExists = await User.findOne({
          username: req.body.username,
        });

        if (checkUserExists) {
          response.message = 'Please try with different username';
          response.key = 'username';
          return res.status(response.responseStatus).send({
            response: response,
          });
        }

        let role = await Role.findOne({
          id: req.body.role,
        });

        let parent = req.body.pname;

        if (role && role.id != 1) {
          if (user.role.id == 2) {
            
            if(!parent) {
              parent = user.username
            }

              // Check user is already exists by username
             let parentUserExists = await User.findOne({
              username: parent,
            });

            if (parentUserExists) {
              parent = parentUserExists.id;

              if(parentUserExists.commission < req.body.commission) {
                response.message = 'Please enter commission less than from agent which is. ' + parentUserExists.commission;
            response.key = 'commission';
            return res.status(500).send(response);
              }
            }
          
          } else if (parent) {
            // Check user is already exists by username
            let parentUserExists = await User.findOne({
              username: parent,
            });

            if (parentUserExists) {
              parent = parentUserExists.id;

              if(parentUserExists.commission < req.body.commission) {
                response.message = 'Please enter commission less than from agent which is. ' + parentUserExists.commission;
            response.key = 'commission';
            return res.status(500).send(response);
              }
            }
          } else if (user.role.id == 1 && role.id == 3 && !parent) {
            response.message = 'Please enter agent name if you want create customer.';
            response.key = 'parent';
            return res.status(500).send(response);
          }

          let newUseInfo = {
            provider: 'username',
            email: req.body.email,
            phone: req.body.phone,
            username: req.body.username,
            name: req.body.name,
            password: req.body.password,
            commission: req.body.commission,
            role: role._id,
            coins: req.body.coins,
            status: true,
            games: req.body.games
          };

          if( parent ) {
            newUseInfo.parent =  parent;
          }

          if(!newUseInfo.commission || typeof newUseInfo.commission == undefined ) {
            newUseInfo.commission = 0;
          } 

          // Create user query
          let newUser = await User.create(newUseInfo);

          // Add salting in password
          newUser.registerUser(newUser, (err, user) => {
            if (err) throw err;
            // just redirect to login
            response.message = 'User Created Successfully';
            response.status = 1
            return res.status(200).send(response)
          });
        }
      } else {
        response.message = 'Role missed';
        response.key = 'role';
        return res.status(response.responseStatus).send({
          response: response,
        });
      }
    } catch (err) {
      logger.error(err.message, {metadata: err});
      return res.status(500).json({
        message: err.message || err.toString(),
      });
    }
  } else {
    return res.status(500).json({ status: 0, message: 'Restricted area only for admin/agents' });
  }
});

/**
 * Edit user
 */
router.put('/:id', requireJwtAuth, async (req, res) => {
  let authstatus = await verifyToken(req);
  if (authstatus.status == 0) {
    return res.status(403).json(authstatus);
  }

  let permission = await checkpermission(req.user.role.id, 'editUser');
  if (permission.status == 0) {
    return res.status(403).json(permission);
  }

  delete req.body.coins;
  delete req.body.username;
  delete req.body.provider;

  if (req.user.role.id == 3 && req.params.id != req.user.id) {
    return res.status(403).json({ messsage: 'Your are not allowed to access this information' });
  }

  // Todo for agent

  let response = {
    status: 0,
    message: 'Issue in update user request',
  };
  try {
    let user = req.user;

    if (user.role.id == 2 && req.body.commission > user.commission) {
      response.message = 'You can not enter more than your commission ' + user.commission;
      response.key = 'commission';
      return res.status(500).json(response);
    }

    /*if (user.role.id == 2 && req.body.commission < 4) {
      response.massage = 'You can not Enter Less than 4% commission to Customer';
      response.key = 'commission';
      return res.status(500).json(response);
    }*/

    if (user.role.id == 1) {
      let userUp = await User.findOne(
        { _id: ObjectId(req.params.id), parent: { $type: 'objectId' } },
        '_id commission',
      ).populate('parent').exec();
      if (userUp) {
        if (userUp.parent.commission < req.body.commission) {
          response.message = "You can not enter more than Agent's commission " + userUp.commission;
          response.key = 'commission';
          return res.status(500).send({
            response: response,
          });
        }
      }
    }

    if(!req.body.commission || typeof req.body.commission == undefined ) {
      req.body.commission = 0;
    } 

    let updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      },
    );

    if (req.body.password !== undefined && req.body.password) {
      updateUser.registerUser(updateUser, (err, user) => {
        if (err) throw err;

        // res.json({
        //   message: 'User has been updated'
        // }); // just redirect to login
      });
    }
    if (!updateUser)
      return res.status(404).json({
        message: 'Records not found',
      });

    response = {
      status: 1,
      message: 'Updated user',
    };

    res.status(200).json(response);
  } catch (err) {
    logger.error(err.message, {metadata: err});
    res.status(500).json({
      message: 'Issue in update user request.',
    });
  }
});

router.post('/change-password', requireJwtAuth, async (req, res) => {
  let authstatus = await verifyToken(req);
  if (authstatus.status == 0) {
    return res.status(403).json(authstatus);
  }

  let response = {
    status: 0,
    message: 'Issue in change password request',
  };

  try {
    let user = req.user;
    let password = req.body.password;
    let newpassword = req.body.newpassword;

    // Check for empty both passwords
    if (!password || !newpassword) {
      response.message = 'Both passwords are required.';
      return res.status(500).json(response);
    }

    const comparepwd = function (err, isMatch = false) {
      if (isMatch) {
        user.password = newpassword;
        // Add salting in password
        user.registerUser(user, (err, newuser) => {
          if (err) throw err;
        });

        response.status = 1;
        response.message = 'Password updated';

      } else {
        response.message = 'Password Incorrect';
      }

      res.status(response.status == 1 ? 200 : 500).send(response);
    }
    user.comparePassword(password, comparepwd);
  } catch (err) {
    logger.error(err.message, {metadata: err});
    response.message = err.message || err.toString();
    res.status(500).json(response);
  }
});


router.post('/logout/user', requireJwtAuth, async (req, res) => {
  let authstatus = await verifyToken(req);
  if (authstatus.status == 0) {
    return res.status(403).json(authstatus);
  }

  try {
    let response = {
      status: 0,
      message: 'Issue in logout request',
    };

    let user = req.user;
    let userId = req.body.userId;
    if (user.role.id == 1 || user.role.id == 2) {
      let loggUser = await User.updateOne({ _id: ObjectId(userId) }, { token: '' }).exec();

      response.status = 1;
      response.message = 'logout successfully';

    }
    //res.send(loggUser);
    res.status(response.status == 1 ? 200 : 500).send(response);
  } catch (err) {
    logger.error(err.message, {metadata: err});
    response.message = err.message || err.toString();
    res.status(500).json(response);
  }
});


router.post('/register', async (req, res) => {
  const { error } = Joi.validate(req.body, addUsersSchema);
  if (error) {
    return res.status(422).send({
      message: error.details[0].message,
    });
  }

  let response = {
    status: 0,
    message: 'Issue in user register request',
  };

  try {
    let mobile = req.body.phone;
    let otp = Math.floor(100000 + Math.random() * 900000);
    let userF = await User.findOne({
      $or: [
        { 'phone': req.body.phone },
        { 'username': req.body.username },
        { 'email': req.body.email }
      ]
    });
    if (userF) {
      response.message = 'This User already Exists';
      response.status = 0;
      return res.status(500).json(response);
    } else {
    var url = "http://sms.havfly.com/api/smsapi?key=d44b1d7c8409ed643ae8eee60508939b&route=4&sender=LTSBOK&number=" + mobile + '&sms=LTSBOK%20login%20OTP%20is%20' + otp + '&templateid=1207163715066477850'

    fileGetContents(url).then(json => {
      JSON.parse(json);
    }).catch(err => {
      logger.error(err.message, {metadata: err});
      return res.send({ err: err.message });
    });

    let agent = await User.findOne({
      username: 'masteragent',
    });

    let newUser = await User.create({
      provider: 'user',
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: mobile,
      username: req.body.username,
      role: ObjectId('6114d5c422b7c53a358bba0b'),
      parent: agent.id,
      otp_state: 0,
      otp: otp,
      status: true
    });

    newUser.registerUser(newUser, (err, user) => {
      if (err) throw err;
      // just redirect to login
      response.message = "OTP is Send to your Mobile Number. Please Verify";
      response.status = 1;
      response.user = newUser;
      return res.status(200).send(response)
    });
  }
  } catch (err) {
    logger.error(err.message, {metadata: err});
    return res.status(500).json({
      message: err.Message,
    });
  }
});

router.post('/verify-otp', async (req, res) => {
  let response = {
    status: 0,
    message: 'Issue in user register request',
  };
  try {
    const { otp, phone } = req.body;
    const user = await User.findOne({ phone }).sort({ createdAt: 'desc' });
    if (!user) {
      response.status = 0;
      response.message = 'User with this Number not found';
      return res.status(500).send(response);
    }

    if (user.otp !== otp && !otp) {
      await User.deleteOne({ phone: phone }).exec();
      response.status = 0;
      response.message = 'Incorrect OTP or please register again';
      return res.status(500).send(response);
    }

    user.otp = "";
    user.otp_state = 1;
    await user.save();

    res.status(200).json({
      status: 1,
      message: "OTP verified successfully",
      user: user,
    });
  } catch (err) {
    logger.error(err.message, {metadata: err});
    response.message = err.message || err.toString();
    res.status(500).json(response);
  };
});


export default router;
