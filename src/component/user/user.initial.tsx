import { initialRole } from "../role/role.initial";
import { User } from "./user.interface";

export const initialUser : User = {
	id: '',
	username: '',
	email: '',
	password: '',
	active: true,
	roles: [initialRole]
	// roles: ['ROLE_USER', 'ROLE_MODERATOR']
}