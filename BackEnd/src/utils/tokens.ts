
import * as jwt from "jsonwebtoken"
import { User } from "src/schemas/user.schema";

const generateToken=(payload:User):string=>{
    const token=jwt.sign({
        data: {
            email:payload.email,
            name:payload.name,
            id:payload.userId
        }
      }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
      return token
}
const verifyToken=(token:string):string=>{
    const decodedToken=jwt.verify(token, process.env.SECRET_KEY)
      return decodedToken
}
export {generateToken,verifyToken}