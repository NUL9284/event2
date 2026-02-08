const fecha = new Date("Feb 9, 2026 07:00:00").getTime();

const intervalo = setInterval(function(){
    const ahora = new Date().getTime();

    const diferencia = fecha - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(diferencia % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const minutos = Math.floor(diferencia % (1000 * 60 * 60) / (1000 * 60));
    const segundos = Math.floor(diferencia % (1000 * 60) / 1000);

    document.getElementById("contador").innerHTML = 
        dias + ":" + horas + ":" + minutos + ":" + segundos;

    if (diferencia < 0){
        clearInterval(intervalo);
        document.getElementById("mensaje").textContent = "LA PREPA YA COMENZO, SUERTE...";
        document.getElementById("contador").style.display = "none";
    }

    if (diferencia <= 0){
    document.getElementById("crabDance").style.display = "none";
    document.getElementById("Fernan").style.display = "flex";
}
}, 1000);

