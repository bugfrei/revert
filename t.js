console.log("Demo App");

// Kunde möchte eine Funktion, die Hello World ausgibt
// Nun soll die Funktion noch Daten ausgeben
function hello() {
    console.log("Hello World!");
    console.log(daten);
}

// Kunde möchte die Hello World Funktion 5 mal ausführen
for(let i = 0; i < 5; i++) {
    hello();
}

// Nun werden noch Daten erstellt

let data1 = "ABC";
let data2 = "123";

// diese Daten sollen in ein JSON-Objekt gepackt werden
let jdata = {
    data1: data1,
    data2: data2
}

// nur ein Kommentar - simuliert weitere Entwicklung OHNE Fehler

Fehler(); // Das hier ist ein Fehler, die Funktion gibt es nicht.
// Zu diesem Fehler würde es aber nicht kommen, da das 
// console.log(daten); von oben schon ein Fehler wirft und das
// Programm abbricht

// noch ein Kommentar, also weitere Entwicklung ohne Fehler
// Der Zweite Fehler (und auch der Erste) ist aber noch da!

console.log("Fertig");

