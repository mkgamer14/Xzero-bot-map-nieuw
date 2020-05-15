const get = require("../../misc/util/getValue");

module.exports = class GroupBase {
	constructor (env, data) {
		this.client = env.client;
		if (env.client.options.setup.includeRaw) this._raw = data;
		this.id = get("groupId", data);
		this.name = get("name", data);

		this._setupMethods();
	}

	_setupMethods () {
		this.client.src.sections.group(this);
	}
};
