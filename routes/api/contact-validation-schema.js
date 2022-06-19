const Joi = require('joi');

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
		})
})

const schemaUpdateContact = Joi.object({
	name: Joi.string()
		.min(3)
		.max(30)
		.optional(),

	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.optional(),

	phone: Joi.string()
		.optional()
})

module.exports = { schemaCreateContact, schemaUpdateContact }