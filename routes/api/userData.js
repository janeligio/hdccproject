// Create route for getting user information
const express = require('express');
const router = express.Router();

const EndUser = require('../../models/EndUser');

// Middleware for making sure user is who they say they are
const authenticator = require('../../config/authenticator');

// @route /user/:userId
// @desc Get sensitive user information
// @access Private
router.get('/:userId', authenticator, (req, res) =>{
	
	const { userId } = req.params.userId;

	// authenticator should have set res.locals.auth
	if(validateUserAuthenticity(res.locals, userId)) 
	{
		// This means user is who they say they are so...
		// Find the user information and return its data
		EndUser
			.findOne(userId)
			.then(user => res.json(user))
			.catch(err => 
				res
					.status(404)
					.json({
						status: 404,
						message: 'User does not exist'
					})
				);
	} else {
		res.status(401).json({
			status: 401,
			message: 'UNAUTHORIZED'
		});
	}
});

const Cryptr = require('cryptr'); // include cryptr module
const cryptr = new Cryptr('key'); // instatiate encrypter/decrypter with the secret key

// @route /user/edit/:userId
// @desc
// @access private
router.post('/user/edit/:userId', authenticator, (req, res) => {

	const { userId } = req.params.userId;
	const { newData } = req.body;

	// authenticator should have set res.locals.auth
	if(validateUserAuthenticity(res.locals, userId)) 
	{
		// If the data is valid then eskeetit
		if(validateNewUserData(newData)) {
			// Find user in collection and update its information
			// Make sure to hash credit card information
			const encryptedCCNumber = cryptr.encrypt(newData.ccNumber);
			newData.ccNumber = encryptedCCNumber;
			// Finally, update the user information
			EndUser
				.updateUser(userId, newData)
				.then(success => res.json({message: 'Updated user information'}))
				.catch(err => res.status(404).json({message: 'Could not update user information'}));
		} else {
			res.status(400).json({errors})
		}
	} else {
		res.status(401).json({
			status: 401,
			message: 'UNAUTHORIZED'
		})
	}
});

const validateUserAuthenticity = (locals, userId) => {
	// Checks:
	// 1. authorization exists
	// 2. authorization has a userId
	// 3. if the authorization's userId matches the given userId
	if(locals.auth && locals.auth.userId && userId === locals.auth.userId){
		return true;
	} else {
		return false;
	}
}

// will get data from the request body
// remember to pull is-empty as an import
const validateNewUserData = (data) => {
	let errors {};
	// Validate user info and update errors

	return {
		errors,
		isValid: isEmpty(errors)
		};

}

// Add this to EndUser Schema

EndUserSchema.statics.updateUser = function(userId, newData) {
	this.updateOne(
			{id:userId},
			{ $set: { newData } }
		)
		.then(user => return true)
		.catch(err => throw err);
}

ListingSchema.statics.findUsersListings = function(userId) {

}


// @route /user/:userId/listings
// @desc Give user his/her listings
// @access private
route.get('/:userId/listings', authenticator, (req, res) => {
	const { userId } = req.params.userId;

	if(validateUserAuthenticity(res.locals, userId)) {
		// Get the userid's owner field
		const errors = {};
		const ownerName = EndUser.findById(userId, 'email', { lean: true}, err => {errors.message: 'User does not exist'});
		// Find all of the user's listings as an array
		const listings = Listing.find({owner: owerName}, { lean: true}, err => {errors.message = 'User has no listings'});
		if(isEmpty(errors)) {
			res.json(listings);
		} else {
			res.json(errors);
		}
	} else {
		res.status(401).json({
			status: 401,
			message: 'UNAUTHORIZED'
		});
	}

});