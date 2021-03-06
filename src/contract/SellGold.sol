pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract SellGold {

    enum SellingStatus { OnSale, Close, Released}
    Member[] public members;//массив зарегистрованных аккаунтов
    Member[] public admins;//массив зарегистрованных аккаунтов
    uint public numAdmins;
    uint public numMembers;//количество зарегистрованных аккаунтов
    uint public numIgnots;
    Ignot[] public ignots;//массив слитков золота
    mapping (address => uint) public memberId;
    mapping (address => uint) public adminId;

    event LogNewAlert(string description);

    

    struct Member{
        address  member;
        uint count_ignots;
        uint balance;
    }
    struct Ignot{
        uint number;
        address owner;
        uint weight;
        uint price;
        SellingStatus status;
        string certificate;
        string description;

    }

    modifier onlyMembers {
        require (memberId[msg.sender] != 0);
        _;
    }

    modifier onlyAdmins {
        require (adminId[msg.sender] != 0);
        _;
    }

    constructor() public {
        members.length++;
        admins.length++;
    }

    function isMember( address _targetMember ) public view returns ( bool ) {
        return ( memberId[_targetMember] != 0 );
    }

    function isAdmin( address _targetMember ) public view returns ( bool ) {
        return ( adminId[_targetMember] != 0 );
    }

    function isMemberBySend( ) public view returns ( bool ) {
        return ( memberId[msg.sender] != 0 );
    }

    

    function addMember(  ) public {
        require ( !isMember(msg.sender) );
        uint id;
        memberId[msg.sender] = members.length;
        id = members.length++;
        numMembers = members.length - 1;
        members[id].member=msg.sender;
        
    }

    function addAdmin(  ) public {
        require ( !isAdmin(msg.sender));
        uint id;
        adminId[msg.sender] = admins.length;
        id = admins.length++;
        numAdmins = admins.length - 1;
        admins[id].member =msg.sender;
    }

    function addIgnotCount(address _member) internal 
    {
        uint res;
        for (uint i=0;i<members.length;i++)
        {
            if(members[i].member==_member)
            {
                members[i].count_ignots++;
                res=i;
                break;
            }
        }
    }

    function minusIgnotCount(address _member) internal 
    {
        for (uint i=0;i<members.length;i++)
        {
            if(members[i].member==_member)
            {
                members[i].count_ignots--;
                break;
            }
        }
    }

    function increase_bal(address _member, uint amount) internal {
        for (uint i=0;i<members.length;i++)
        {
            if(members[i].member==_member)
            {
                members[i].balance+=amount;
                break;
            }
        }
    }

    function decrease_bal(address _member, uint amount) internal {
        for (uint i=0;i<members.length;i++)
        {
            if(members[i].member==_member)
            {
                members[i].balance-=amount;
                break;
            }
        }
    }

    function replenish_the_balance(uint amount) public onlyMembers {
       for (uint i=0;i<members.length;i++)
        {
            if(members[i].member==msg.sender)
            {
                members[i].balance+=amount;
                break;
            }
        } 
    }

    function get_balance(address _member) public view
    returns (uint balance)
    {
        uint res=0;
        for (uint i=0;i<members.length;i++)
        {
            if(members[i].member==_member)
            {
                res=members[i].balance;
                break;
            }
        }
        return res;
    }

    function newIgnot(
        uint _weight, 
        string memory _certificate,
        string memory _description
    ) public
        onlyAdmins
        returns (uint ignotID)
    {
        require( _weight <= (13000) );    
        ignotID = ignots.length++;
        Ignot storage i = ignots[ignotID];
        i.number=ignotID;
        i.owner=msg.sender;
        i.weight=_weight;
        i.price=_weight*59;
        i.certificate=_certificate;
        i.description=_description;
        i.status=SellingStatus.Released;
        numIgnots=ignotID+1;
        addIgnotCount(msg.sender);

        return ignotID;
    }

    function getIgnotbyID(uint _ignotNumberID) public view
        returns ( 
                  uint,
                  address,
                  uint,
                  uint,
                  SellingStatus,
                  string memory,
                  string memory
                ) {
        Ignot memory ignot = ignots[_ignotNumberID];
        return ( 
                 ignot.number,
                 ignot.owner,
                 ignot.weight,
                 ignot.price,
                 ignot.status,
                 ignot.certificate,
                 ignot.description );
    }

    function getIgnotOwnerById (uint _ignotNumberID) public view
      returns (address) 
    {
        Ignot memory ignot = ignots[_ignotNumberID];
        return ( ignot.owner);
    }

    function getIgnotPriceById (uint _ignotNumberID) public view
        returns (uint) 
    {
        Ignot memory ignot = ignots[_ignotNumberID];
        return ( ignot.price);
    }

    function getIgnotCertificateById (uint _ignotNumberID) public view
        returns (string memory) 
    {
        Ignot memory ignot = ignots[_ignotNumberID];
        return ( ignot.certificate);
    }

    function getIgnotWeightById (uint _ignotNumberID) public view
        returns (uint) 
    {
        Ignot memory ignot = ignots[_ignotNumberID];
        return ( ignot.weight);
    }

    function getStatus(SellingStatus _status) internal view returns (string memory) 
    {
        if (SellingStatus.Close == _status) return "Close";
        if (SellingStatus.OnSale == _status) return "On Sale";
        if (SellingStatus.Released == _status) return "Released";
    }

    function getIgnotStatusById (uint _ignotNumberID) public view
        returns (string memory) 
    {
        Ignot memory ignot = ignots[_ignotNumberID];
        return getStatus(ignot.status);
    }


    function OnSaleById(uint _ignotNumberID) public 
    {
        Ignot storage ignot = ignots[_ignotNumberID];
        require (ignot.owner==msg.sender&&(ignot.status==SellingStatus.Close||ignot.status==SellingStatus.Released));
        ignot.status = SellingStatus.OnSale;
        emit LogNewAlert("Your part of gold is for sale");
        
    }

    function OnCloseById(uint _ignotNumberID) public 
    {
        Ignot storage ignot = ignots[_ignotNumberID];
        require (ignot.owner==msg.sender&&(ignot.status==SellingStatus.OnSale||ignot.status==SellingStatus.Released));
        ignot.status = SellingStatus.Close;
        emit LogNewAlert("Your part of gold is closed for sale");
        
    }

    function ChangeOwnerById(uint _ignotNumberID, address _newowner) public 
    {
        Ignot storage ignot = ignots[_ignotNumberID];
        require (isMember(_newowner));
        require (ignot.owner==msg.sender&&(ignot.status==SellingStatus.OnSale||ignot.status==SellingStatus.Released));
        addIgnotCount(_newowner);
        minusIgnotCount(msg.sender);
        ignot.status = SellingStatus.Close;
        ignot.owner=_newowner;
        emit LogNewAlert("Your part of gold change owner");
        
    }

    function BuyIgnot(uint _ignotNumberID) public onlyMembers
    {
        Ignot storage ignot = ignots[_ignotNumberID];
        uint _memberID=memberId[msg.sender];
        
        require (ignot.owner!=msg.sender&&ignot.status==SellingStatus.OnSale&&members[_memberID].balance>=ignot.price);
        addIgnotCount(msg.sender);
        minusIgnotCount(ignot.owner);
        increase_bal(ignot.owner, ignot.price);
        decrease_bal(msg.sender, ignot.price);
        ignot.status = SellingStatus.Close;
        ignot.owner=msg.sender;
        emit LogNewAlert("You buy part of gold");
        
    }

  
    function getMemberCount(address _member) internal view
    returns(uint _count)
    {
        uint res;
        for (uint i=0;i<members.length;i++)
        {
            if(members[i].member==_member)
            {
                res=members[i].count_ignots;
                break;
            }
        }

        return res;
    }

    function getIgnotsUser(address _member) public view
        returns(Ignot[] memory) {
        uint count_ignots=getMemberCount(_member);
        Ignot[] memory res = new Ignot[](count_ignots);
        uint k=0;
        for(uint i=0;i<numIgnots;i++)
        {
            Ignot storage ign = ignots[i];
            if (ign.owner == _member)
            {
                res[k]=ign;
                k++;
            }

        }

        return res;
    }

    function getIgnotsNotUser(address _member) public view
        returns(Ignot[] memory) {
        uint count_ignots=getMemberCount(_member);
        Ignot[] memory res = new Ignot[](numIgnots-count_ignots);
        uint k=0;
        for(uint i=0;i<numIgnots;i++)
        {
            Ignot storage ign = ignots[i];
            if (ign.owner != _member)
            {
                res[k]=ign;
                k++;
            }

        }
        return res;
    }

    function getMyIgnots() public view
        returns(Ignot[] memory) {
        uint count_ignots=getMemberCount(msg.sender);
        Ignot[] memory res = new Ignot[](count_ignots);
        uint k=0;
        for(uint i=0;i<numIgnots;i++)
        {
            Ignot storage ign = ignots[i];
            if (ign.owner == msg.sender)
            {
                res[k]=ign;
                k++;
            }

        }
        return res;
    }
}