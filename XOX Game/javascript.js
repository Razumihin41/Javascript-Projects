const X_CLASS = "cross"; // cross classi eklemek icin tanimlama yaptik.
const O_CLASS = "circle"; // circle classi eklemek icin tanimlama yaptik.
const COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],    // Oyunun kazanilmasi için olan tüm ihtimalleri dizi içerisinde olusturduk
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//  Dom üzerinden gerekli tanimlamalari degiskenlere atadik

const board = document.querySelector("#board");
const cells = document.querySelectorAll(".cell");
const result = document.querySelector("#result");
const resultText = document.querySelector(".result-text");
const restartButton = document.querySelector("#restartButton");

let turn;   // Siranin kimde oldugunu true false ile kontrol edecegiz. 

const StartGame = () => {
    turn = false    // Sira x ile basliyor
    resetGame()     // Oyunu sifirliyoruz
    placeHover()    // Mouse kutucuk üzerindeyken hangi simgenin cikacagini belirliyoruz
    result.classList.remove("show") // Oyun sonuc ekranini gizlemek icin show classini kaldiriyoruz
};

const resetGame = () => {
    cells.forEach(cell => {     // Tüm kutuculari dönüyoruz
        cell.classList.remove(X_CLASS)  // kutucuklarin icindeki classlari kaldiriyoruz.
        cell.classList.remove(O_CLASS)
        cell.addEventListener("click", handleClick, { once: true })   // Tekrar event ekliyoruz fakat once: true nesnesi 
    })                      // ekleyerek bir defa tiklanilabilmesini sagliyoruz.
};

const handleClick = (e) => {
    const cell = e.target  // Kutucugu hedefleyerek cell degiskenine atiyoruz
    const currentClass = turn ? O_CLASS : X_CLASS   // turn true ise O_CLASS false ise X_CLASS degiskenini alacak
    placeMark(cell, currentClass)   // Cell ve currentClass parametrelerini placeMark fonksiyonuna gonderiyoruz 
    if (checkWin(currentClass)) {   // checkWin fonksiyonuna giderek sorgulama yapiyoruz
        endGame(false)   // İslem true dönerse kazanan olacagindan endGame fonksiyonuna false gonderiyoruz
    } else if (isDraw()) { // Oyunun beraberlik durumunu sorgulamak icin isDraw fonksiyonuna gidiyoruz
        endGame(true)    // Oyun beraberlik durumunda ise endGame fonksiyonuna true parametresi ile gidiyoruz
    } else {    // Oyunun bitmemiş olma durumunu inceliyoruz
        swapTurn()   // Sira degisikligi fonksiyonuna gidiyoruz
        placeHover() // Mouse ile kutucuklarin ustune geldigimizde cikacak olan simgeyi belirleyen fonksiyona gidiyoruz
    }
};

const placeMark = (cell, currentClass) => { cell.classList.add(currentClass) };   // Tikladigimiz dive class ekliyoruz

// Oyunu kimin kazandigini sorguluyoruz.
const checkWin = (currentClass) => {    // Secilen classi parametre olarak gondererek
    return COMBINATIONS.some(combination => {   // kombinasyonlar icinde [0, 1, 2] degeri gibi dizileri tek tek aliyoruz
        return combination.every(index => { // kombinasyon dizileri icerisindeki degerlerin hepsi 
            return cells[index].classList.contains(currentClass) // cells divi icinde gerekli olan class var mi yok mu
        })  // Sorgulama islemi yapiyoruz. ilk olarak [0, 1, 2] degerine bakip ayni classlara sahipse true dönüyoruz
    })
};

const endGame = (draw) => {
    if (draw) resultText.innerText = "Beraberlik!"  // Oyun bitisinde draw true ise beraberlik durumu olacak
    else resultText.innerText = `${turn ? "O" : "X"} Kazandi!`  // turn durumuna gore kimin kazanacagini belirtiyoruz
    result.classList.add("show"); // Display none yaptigimiz classi cagirarak kazanani belirten kismi cagiriyoruz.
}

// Oyunun beraberlik durumunu sorguluyoruz.
const isDraw = () => {
    return [...cells].every(cell => {   // [...cells] diyerek tüm divleri dizi şeklinde aldik ve every metotu ile döndürdük
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })  // dönen degerlerin classinin icinde contains metotu ile x ve o classi var mi diye kontrol ediyoruz.
};  // Hepsinde var ise beraberlik olacagindan isDraw fonksiyonu true donecektir

const swapTurn = () => { turn = !turn };  // True o // False x olacak şekilde döndürüyoruz.

const placeHover = () => {
    board.classList.remove(X_CLASS);    // Mouse ile kutucuklara geldigimizde siranin durumuna göre cikacak simgeleri siliyoruz.
    board.classList.remove(O_CLASS);    // Her iki classida silip garantiye aldiktan sonra
    if (turn) board.classList.add(O_CLASS); // turn true ise o classini 
    else board.classList.add(X_CLASS);  // false ise x classini ekliyoruz ve üstüne gelindiginde o simgenin cikmasini sagliyoruz
}

restartButton.addEventListener("click", StartGame);     // Butona event atiyarak oyunun tekrar baslamasini sagliyoruz

StartGame();  // Sayfa acildiginda oyunu baslatiyoruz





