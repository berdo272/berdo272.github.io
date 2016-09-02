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

        Player = { Name: name, Health: 100, Energy: 10, Money: 10, Experience: 1};
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
	var playerMoney = parseInt($('#pMoney').text());
    var playerHealth = parseInt($('#pHealth').text());
    if (playerMoney >= 5 && playerHealth <= 90){
      $('#buyPotion').prop('disabled',false);
  } else {
      $('#buyPotion').prop('disabled',true);
  }
  if (playerMoney >= 75){
    $('#buyLongSword').prop('disabled',false);
} else {
    $('#buyLongSword').prop('disabled',true);
}
if (playerMoney >= 100){
    $('#buyBronzeChain').prop('disabled',false);
} else {
    $('#buyBronzeChain').prop('disabled',true);
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
    enableTravel();
}
function loadGame() {	
    var UserData;
    var userName = $('#pName').text()
    UserData = checkCookie(userName);
    updateTables(UserData);
    enableTravel();
}
function buyItem(item){
    var playerMoney =  parseInt($('#pMoney').text());
    var playerHealth = parseInt($('#pHealth').text());
    switch(item){
        case 'potion':
        playerMoney -= 5;
        playerHealth += 10;
        $('#pMoney').html(playerMoney);
        $('#pHealth').html(playerHealth);
        break;
        case 'bronzeChain':
        playerMoney -= (100 - parseInt($('#aValue').text));
        $('#aName').html("Bronze Chainmail");
        $('#aDef').html(10);
        $('#aValue').html(25);
        $('#playerMoney').html(playerMoney);
        break;
        case 'longsword':
        playerMoney -= (75 - parseInt$('#wValue').text());
        $('#wName').html("LongSword");
        $('#wAtk').html(10);
        $('#wValue').html(18);
        $('#pMoney').html(playerMoney);
    }
}
function disableTravel(){
    $('#field').prop('disabled',true);
    $('#forest').prop('disabled',true);
    $('#cave').prop('disabled',true);
}
function enableBattleCommands(){
    $('#attack').prop('disabled',false);
    $('#run').prop('disabled',false);
}
function disableBattleCommands(){
    $('#attack').prop('disabled',true);
    $('#run').prop('disabled',true);
}
function enableTravel(){
    $('#field').prop('disabled',false);
    $('#forest').prop('disabled',false);
    $('#cave').prop('disabled',false);
}
function disableShopping(){
    $('#buyLongSword').prop('disabled',true);
    $('#buyPotion').prop('disabled',true);
    $('#buyBronzeChain').prop('disabled',true);
} 
function battleStart(){
    disableTravel();
    enableBattleCommands()
    disableShopping()
    $('#saveGame').prop('disabled',true);
    
}
function battleEnd(){
    disableBattleCommands()
    enableTravel()
    $('#saveGame').prop('disabled',false);
    checkIfCanBuy();
}
function death(){
    disableBattleCommands();
}
function clearEnemyTable(){
    $('#enemyExp').html("");
    $('#enemyHp').html("");
    $('#enemyAtk').html("");
    $('#enemyDef').html("");
    $('#enemyGold').html("");
    $('#enemPicture').html("");
    document.getElementById("enemyPicture").removeChild(pic);
}
function enemyDies(){
    var playerMoney;
    var playerExp;
    var exp;
    var gold;

    playerMoney = parseInt($('#pMoney').text());
    playerExp = parseInt($('#pExp').text());
    exp = parseInt($('#enemyExp').text());
    gold = parseInt($('#enemyGold').text());
    playerMoney += gold;
    playerExp += exp;
    alert("The enemy has died! You loot " + gold + "gold, and gain " + exp + " Experience.");

    $('#pMoney').html(playerMoney);
    $('#pExp').html(playerExp);
    clearEnemyTable();
}
function field(){
    var rat = {Health:10, Attack: 4, Defense: 1, Gold: 2, exp: 2, picture: "Images/rat.jpg"};
    var slime = {Health:12, Attack: 5, Defense: 2, Gold: 5, exp: 5, picture: "Images/slime.jpg"};
    var monsters = [rat,slime];
    var x = Math.floor((Math.random() * monsters.length));
    var pic = document.createElement("img");
    pic.src = monsters[x].picture;
    pic.id = "pic"

    battleStart();

    $('#enemyHp').html(monsters[x].Health);
    $('#enemyAtk').html(monsters[x].Attack);
    $('#enemyDef').html(monsters[x].Defense);
    $('#enemyGold').html(monsters[x].Gold);
    $('#enemyExp').html(monsters[x].exp);
    document.getElementById("enemyPicture").appendChild(pic);
}
function enemyAttacks(){
    var pHealth = parseInt($('#pHealth').text());
    var pDef = parseInt($('#aDef').text());
    var eAtk = parseInt($('#enemyAtk').text());
    var dialog = "";

    if(eAtk>pDef){
        pHealth -= (eAtk - pDef);
        $('#pHealth').html(pHealth);
        dialog += "The enemy attacks you. You have taken " + (eAtk - pDef) +" damage. \n\n";
        return dialog;
    } else {
        dialog += "The enemy attack is completely deflected by your armour. \n\n";
        return dialog;
    }
}
function playerAttacks(){
    var pAtk = parseInt($('#wAtk').text());
    var eHealth = parseInt($('#enemyHp').text());
    var eDef = parseInt($('#enemyDef').text());
    var dialog = "";

    if(pAtk>eDef){
        eHealth -= (pAtk - eDef);
        $('#enemyHp').html(eHealth);
        dialog += "Your attack hits the enemy, dealing " + (pAtk - eDef) + " damage.";
        return dialog;
    } else {
        dialog =+ "Your attack glances off of the enemy's tough defence."
        return dialog;
    }
}
function checkBattleHP(){
    var pHealth = parseInt($('#pHealth').text());
    var eHealth = parseInt($('#enemyHp').text());

    if (pHealth <= 0){
        death();
        alert("You have died. Please load from the saved game to continue.")
    }
    if(eHealth <= 0){
        enemyDies();
        battleEnd();
    }
}
function attack(){
    var dialog = "";

    dialog += enemyAttacks();
    dialog += playerAttacks();
    $('#gameText').html(dialog);
    checkBattleHP();
}
function run(){
    var dialog = "";
    var runCheck;

    runCheck = Math.floor((Math.random() * 10) + 1);

    if (runCheck >= 7) {
        battleEnd();
        dialog += "You have successfully run away."
        clearEnemyTable();
    } else {
     dialog += enemyAttacks();
     checkBattleHP();
 }
 $('#gameText').html(dialog);
}