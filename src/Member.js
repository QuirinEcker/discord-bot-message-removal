class Member {
    constructor(id, name, serverID, server, invitedPeopleCount) {
        this.id = id;
        this.name = name;
        this.serverID = serverID;
        this.server = server;
        this.invitedPeopleCount = invitedPeopleCount;
    }

    addInvites(invites) {
        this.invitedPeopleCount += invites;
    }
}

module.exports = Member;