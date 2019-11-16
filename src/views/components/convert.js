module.exports ={
    convertion(number){
        number = parseInt(number, 10);
        number = number.toLocaleString('fullwide', {useGrouping:false})
        var len = number.length

        console.log(number)
        //UNDER
        if(len < 4){
            return number
        }

        //MILLE
        else if(len > 3 && len < 7){
            if(len == 5){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Mille'
            }
            else if(len == 6){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Mille'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Mille'
        }

        //MILLIONS
        else if(len > 6 && len < 10){
            if(len == 8){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Millions'
            }
            else if(len == 9){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Millions'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Millions'
        }

        //MILLIARDS
        else if(len > 9 && len < 13){
            if(len == 11){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Milliards'
            }
            if(len == 12){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Milliards'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Milliards'
        }

        //BILLIONS
        else if(len > 12 && len < 16){
            if(len == 14){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Billions'
            }
            if(len == 15){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Billions'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Billions'
        }

        //BILLARDS
        else if(len > 15 && len < 19){
            if(len == 17){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Billiards'
            }
            if(len == 18){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Billiards'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Billiards'
        }

        //TRLLIONS
        else if(len > 18 && len < 22){
            if(len == 20){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Trillions'
            }
            if(len == 21){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Trillions'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Trillions'
        }

        //TRILLIARDS
        else if(len > 21 && len < 25){
            if(len == 23){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Trilliards'
            }
            if(len == 24){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Trilliards'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Trilliards'
        }

        //QUADRILLIONS
        else if(len > 24 && len < 28){
            if(len == 26){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Quadrillions'
            }
            if(len == 27){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Quadrillions'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Quadrillions'
        }

        //QUADRILLIARDS
        else if(len > 27 && len < 31){
            if(len == 29){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Quadrilliards'
            }
            if(len == 30){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Quadrilliards'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Quadrilliards'
        }

        //QUINTILLIONS
        else if(len > 30 && len < 34){
            if(len == 32){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Quintillions'
            }
            if(len == 33){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Quintillions'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Quintillions'
        }
    
        //QUINTILLIARDS
        else if(len > 33 && len < 37){
            if(len == 35){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Quintilliards'
            }
            if(len == 36){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Quintilliards'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Quintilliards'
        }

        //SEXTILLIONS
        else if(len > 36 && len < 40){
            if(len == 38){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Sextillions'
            }
            if(len == 39){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Sextillions'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Sextillions'
        }
    
        //SEXTILLIARDS
        else if(len > 39 && len < 43){
            if(len == 41){
                return number.substring(0,2) + ',' + number.substring(2, 5) + ' Sextilliards'
            }
            if(len == 42){
                return number.substring(0,3) + ',' + number.substring(3, 6) + ' Sextilliards'
            }
        return number[0] + ',' + number.substring(1, 4) + ' Sextilliards'
        }

        else{
            return "Infinity";
        }
    }
}