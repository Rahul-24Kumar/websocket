const AccessControl = require("accesscontrol");
// console.log(AccessControl)
const ac = new AccessControl();
// console.log(ac)
let roles = (function () {

    ac.grant("user")
        .readOwn("profile")
        .updateOwn("profile")

    ac.grant("admin")
        .extend("user")
        .updateAny("profile")
        .deleteAny("profile")

    return ac;

})();

module.exports = { roles }


// ac.grant("supervisor")
// .extend("basic")
// .readAny("profile")

//extend : can inherit any role