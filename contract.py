from algopy import (
    ARC4Contract, 
    Account,
    Global,
    Txn,
    UInt64,
    arc4,
)

class Base(ARC4Contract):
    ##############################################
    # function: __init__ (builtin)
    # arguments: None
    # purpose: construct initial state
    # pre-conditions: None
    # post-conditions: initial state set
    ##############################################
    def __init__(self) -> None:
        # Globals
        self.manager = Account()    # zero address
        self.owner = Account()      # zero address
        self.version = UInt64()     # 0
        self.updatable = UInt64()   # 0
        # Locals
        #   None
        # Box
        #   None
    ##############################################
    # function: setup
    # arguments:
    # - manager, the address of the manager
    # - owner, the address of the owner
    # purpose: setup application
    # post-conditions: lend_status setup
    ##############################################
    @arc4.abimethod
    def setup(
        self, 
        manager: arc4.Address,
        owner: arc4.Address,
    ) -> None:
        ##########################################
        assert self.manager == Global.zero_address, "manager not initialized"
        assert self.owner == Global.zero_address, "owner not initialized"
        ##########################################
        self.manager = manager.native
        self.owner = owner.native

    @arc4.abimethod()
    def approve_update(self, approval: arc4.UInt64) -> None:
        assert Txn.sender == self.owner, "must be owner"
        self.updatable = approval.native

    @arc4.baremethod(allow_actions=["UpdateApplication"])
    def on_update(self) -> None:
        ##########################################
        # WARNING: This app can be updated by the manager
        ##########################################
        assert Txn.sender == self.manager, "must be manager"
        assert self.updatable == UInt64(1), "not approved"
        ##########################################
        self.version = self.version + UInt64(1)
        self.updatable = UInt64(0)

    @arc4.baremethod(allow_actions=["DeleteApplication"])
    def on_delete(self) -> None:
        ##########################################
        # WARNING: This app can be deleted by the creator (Development)
        ##########################################
        assert Txn.sender == Global.creator_address, "must be creator"
        ##########################################


