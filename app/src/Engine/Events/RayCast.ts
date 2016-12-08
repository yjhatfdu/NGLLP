/**
 * Created by yjh on 2016/11/11.
 */
import * as Engine from '../Engine'
import {FrameBuffer} from "../Core/FrameBuffer";
//support 16*16*16 objects
const FB_SIZE = 512;

export module RayCast {
    let fb = new FrameBuffer(FB_SIZE, FB_SIZE, 'UNSIGNED_BYTE');
}