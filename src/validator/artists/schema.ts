import Joi from "joi"

const ArtistPayloadSchema = Joi.object({
    artist_name: Joi.string().max(100).required(),
    package_name: Joi.string().max(100).required(),
    release_date: Joi.string().required()
});




export {
    ArtistPayloadSchema
}