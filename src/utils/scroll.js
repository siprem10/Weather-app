export function setViewScrollY(savedScrollY){
    window.scrollTo({
        top: savedScrollY,
        left: 0,
        behavior: "instant"
    });
}