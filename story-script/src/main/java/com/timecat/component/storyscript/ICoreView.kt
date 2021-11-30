package com.timecat.component.storyscript

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
interface ICoreView {
    var core: IEventCore?
    fun init(core: IEventCore)
}