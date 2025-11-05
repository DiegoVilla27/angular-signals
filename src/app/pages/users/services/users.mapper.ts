import { IUserEntity } from "../entities/user.entity";
import { IUserModel } from "../models/user.models";

/**
 * Convert an array of IUserModel objects into an array of IUserEntity objects.
 *
 * Performs a shallow transformation copying only the fields required by the
 * consumer-facing entity shape.
 *
 * @param {IUserModel[]} users - The source user models to map.
 * @returns {IUserEntity[]} A new array of user entities containing id, name, email and phone.
 *
 * @remarks
 * - The function is pure: it does not mutate the input array or its objects.
 * - Only selected properties are mapped; additional properties on IUserModel
 *   will be ignored.
 */
const usersMapper = (users: IUserModel[]): IUserEntity[] => {
  return users.map((userModel) => {
    return {
      id: userModel.id,
      name: userModel.name,
      email: userModel.email,
      phone: userModel.phone
    }
  });
}

export default usersMapper;



