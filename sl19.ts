/**
 * SL19 Tempertaure Sensor
 */
//% weight=10 color=#17202A icon="\uf491" block="SL19"
namespace SL19 {
    const MLX90614_REG_RAWIR1 = 0x04
    const MLX90614_REG_RAWIR2 = 0x05
    const MLX90614_REG_TA = 0x06
    const MLX90614_REG_TOBJ1 = 0x07
    const MLX90614_REG_TOBJ2 = 0x08
    const MLX90614_REG_TOMAX = 0x20
    const MLX90614_REG_TOMIN = 0x21
    const MLX90614_REG_PWMCTRL = 0x22
    const MLX90614_REG_TARANGE = 0x23
    const MLX90614_REG_EMISS = 0x24
    const MLX90614_REG_CONFIG = 0x25
    const MLX90614_REG_ADDR = 0x0E
    const MLX90614_REG_ID1 = 0x3C
    const MLX90614_REG_ID2 = 0x3D
    const MLX90614_REG_ID3 = 0x3E
    const MLX90614_REG_ID4 = 0x3F

    function readTemp(addr: number): number {
        //let data: number;
        pins.i2cWriteNumber(0x5A, addr, NumberFormat.UInt8LE, true);
        let buf: Buffer = pins.createBuffer(3);
        buf = pins.i2cReadBuffer(0x5A, 3, false);
        let result = (buf[0]) | (buf[1] << 8);
        return result;
    }

    function getAmbTemp(): number {
        let tempData = readTemp(MLX90614_REG_TA);
        tempData = tempData / 50;
        tempData = tempData - 273;
        let ambient_temp = tempData;
        return ambient_temp;
    }

    function getObjTemp(): number {
        let tempData = readTemp(MLX90614_REG_TOBJ1);
        tempData = tempData / 50;
        tempData = tempData - 273;
        let object_temp = tempData;
        return object_temp;
    }

    /**
    * SL19 Initialize
    */
    //% blockId="Init" block="Init"
    //% blockGap=1 weight=90
    export function init(): void {
        let ID = readTemp(MLX90614_REG_ID1);
    }

    /**
    * SL19 Ambient Temperature (C)
    */
    //% blockId="Ambient Temp" block="Ambient Temp (C)"
    //% blockGap=1 weight=90
    export function getAmbientTemp(): number {
        return getAmbTemp();
    }
    /**
   * SL19 Object Temperature (C)
   */
    //% blockId="Object Temp" block="Object Temp (C)"
    //% blockGap=1 weight=90
    export function getObjectTemp(): number {
        return getObjTemp();
    }
}
