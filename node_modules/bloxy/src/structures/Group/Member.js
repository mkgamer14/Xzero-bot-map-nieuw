const GroupRole = require("./Role");
const PartialUser = require("../User").Partial;

module.exports = class GroupMember {
	constructor (env, data, roleData) {
		this.env = env;
		this.user = (data.user || data) && new PartialUser(env, data.user || data);
		this.role = data.role && new GroupRole(env, roleData || data.role);
	}

	kick () {
		return this.env.kick(this.user.id);
	}

	setRole (role) {
		return this.env.updateMember(this.user.id, role.id);
	}

	payoutOnce (amount) {
		return this.env.payoutUsers([
			{
				userId: this.user.id,
				amount: amount,
			},
		]);
	}

	makeOwner () {
		return this.env.changeOwner(this.user.id);
	}

	deleteWallPosts () {
		return this.env.deleteUserWallPosts(this.user.id);
	}
};
