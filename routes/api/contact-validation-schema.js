const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const schemaCreateContact = Joi.object({
	name: Joi.string()
		.min(3)
		.max(30)
		.required()
		.messages({
			'any.required': 'Поле name обязательно',
			'string.empty': 'Поле name не может быть пустым'
		}),

	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.optional(),

	phone: Joi.string()
		.required()
		.messages({
			'any.required': 'Поле phone обязательно',
			'string.empty': 'Поле phone не может быть пустым'
		}),

	favorite: Joi.boolean()
		.required()
		.messages({
			'any.required': 'Поле favorite обязательно',
			'string.empty': 'Поле favorite не может быть пустым'
		})
})

const schemaFavoriteContact = Joi.object({
	favorite: Joi.boolean()
		.required()
		.messages({ 'any.required': 'missing field favorite' }),
})

const schemaMongoId = Joi.object({
	contactId: Joi.objectId().required(),
})
module.exports = { schemaCreateContact, schemaFavoriteContact, schemaMongoId }