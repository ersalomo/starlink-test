import {ArtistPayloadSchema} from "./schema";
import InvariantError from "../../exception/invariant-error";

export const ArtistValidator = {
    artistPayloadValidate: (payload :any) => {
        const { error, value } = ArtistPayloadSchema.validate(payload);

        if (error) throw new InvariantError(error.message);

        return value;
    }
}


