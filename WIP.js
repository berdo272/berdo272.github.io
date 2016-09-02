"use strict";
function GetPlayerInput(text) {
    var input;
    input = prompt(text);
    return input;
}

function getCookie(cName) {
    var name = cName + "=";
    var c;



    var cookieArray = document.cookie.split(";");
    for (var i = 0; i < cookieArray.length; i++) {
        c = cookieArray[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie(name) {
    var Player;
    var Weapon;
    var Armour;

    Player = { Name: "", Health: 0, Energy: 0, Money: 0, Experience: 0};
    Weapon = { Name: "", Dmg: 0, Value: 0};
    Armour = { Name: "", Def: 0, Value: 0};

    var userCookie = getCookie(name);
    if (userCookie != "") {
        alert("Game Data Loaded For " + name);

        var cookieArray = userCookie.split(",");

        for (var i = 0; i <cookieArray.length; i++) {

            switch(i){
                case 0:
                Player.Name = cookieArray[i];
                break;
                case 1:
                Player.Health = parseInt(cookieArray[i]);
                break;
                case 2:
                Player.Energy = parseInt(cookieArray[i]);
                break;
                case 3:
                Player.Money = parseInt(cookieArray[i]);
                break;
                case 4:
                Player.Experience = parseInt(cookieArray[i]);
                break;
                case 5:
                Weapon.Name = cookieArray[i];
                break;
                case 6:
                Weapon.Dmg = parseInt(cookieArray[i]);
                break;
                case 7:
                Weapon.Value = parseInt(cookieArray[i]);
                break;
                case 8:
                Armour.Name = cookieArray[i];
                break;
                case 9:
                Armour.Def = parseInt(cookieArray[i]);
                break;
                case 10:
                Armour.Value = parseInt(cookieArray[i]);
                break;
            }
        }
        var UserData = {CharacterData: Player ,WeaponData: Weapon,ArmourData: Armour}

        return UserData;
    } else {

        Player = { Name: name, Health: 100, Energy: 10, Money: 10, Experience: 0};
        Weapon = { Name: "Adventurer's Blade", Dmg: 3, Value: 5};
        Armour = { Name: "Adventurer's Jerkin", Def: 3, Value: 5};

        alert("New Game Data Created For " + name);

        var UserData = {CharacterData: Player ,WeaponData: Weapon,ArmourData: Armour};

        return UserData;
    }
}

function SetCookie(Player,Weapon,Armour){
    var cName = Player.Name;
    var cValue = "";
    var playerProps;
    var weaponProps;
    var armourProps;

    playerProps = Object.values(Player);
    weaponProps = Object.values(Weapon);
    armourProps = Object.values(Armour);

    for (var i=0; i<playerProps.length;i++){
    		cValue += (playerProps[i] + ",");    	        
    }
    for (var i=0; i<weaponProps.length;i++){
    		cValue += (weaponProps[i] + ",");       
    }
    for (var i=0; i<armourProps.length;i++){
    		cValue += (armourProps[i] + ",");       
    }

    var d = new Date();
    d.setTime(d.getTime()+604800000);
    var expires = "expires="+d.toUTCString();


    document.cookie = cName + "=" + cValue + "; " + expires;
}
function saveGame(){   
    var cValue = "";
    var cName = $('#pName').text();
    var Health = $('#pHealth').text();
    var Energy = $('#pEnergy').text();
    var Money = $('#pMoney').text();
    var Experience = $('#pExp').text();
    var wName = $('#wName').text();
    var wAtk = $('#wAtk').text();
    var wValue = $('#wValue').text();
    var aName = $('#aName').text();
    var aDef = $('#aDef').text();
    var aValue = $('#aValue').text();
    cValue += (cName + ",");
    cValue += (Health + ",");
    cValue += (Energy + ",");
    cValue += (Money + ",");
    cValue += (Experience + ",");
    cValue += (wName + ",");
    cValue += (wAtk + ",");
    cValue += (wValue + ",");
    cValue += (aName + ",");
    cValue += (aDef + ",");
    cValue += (aValue + ",");
    var d = new Date();
    d.setTime(d.getTime()+604800000);
    var expires = "expires="+d.toUTCString();


    document.cookie = cName + "=" + cValue + "; " + expires;
    alert("Game Saved")
}
function updateTables(UserData){
	 $('#pName').html(UserData.CharacterData.Name);
	 $('#pHealth').html(UserData.CharacterData.Health);
	 $('#pEnergy').html(UserData.CharacterData.Energy);
	 $('#pMoney').html(UserData.CharacterData.Money);
	 $('#pExp').html(UserData.CharacterData.Experience);
	 $('#wName').html(UserData.WeaponData.Name);
	 $('#wAtk').html(UserData.WeaponData.Dmg);
	 $('#wValue').html(UserData.WeaponData.Value);
	 $('#aName').html(UserData.ArmourData.Name);
	 $('#aDef').html(UserData.ArmourData.Def);
	 $('#aValue').html(UserData.ArmourData.Value);
	 checkIfCanBuy(UserData);
}
function disable(){
	$('#startGame').prop('disabled',true);
	$('#saveGame').prop('disabled',true);
	$('#buyPotion').prop('disabled',true);
}
function checkIfCanBuy(UserData){
	if (UserData.CharacterData.Money >= 5 && UserData.CharacterData.Health < 100)
	{
		$('#buyPotion').prop('disabled',false);
	} else {
		$('#buyPotion').prop('disabled',true);
	}
}
function enableStart(){
	$('#startGame').prop('disabled',false);
}
function startGame(){
	var UserData;
    var userName = document.getElementById('nameEntry').value
    UserData = checkCookie(userName);
    updateTables(UserData);
    $('#Load').html("<button type=\"button\" id=\"loadGame\" onclick=\"loadGame()\">Load Game</button>");
    $('#saveGame').prop('disabled',false);
}
function loadGame() {	
    var UserData;
    var userName = $('#pName').text()
    UserData = checkCookie(userName);
    updateTables(UserData);
}