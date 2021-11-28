package com.timecat.component.storyscript

import android.content.Context
import android.util.Log
import androidx.test.core.app.ApplicationProvider
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.JSONArray
import com.alibaba.fastjson.JSONObject
import org.junit.After
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/26
 * @description null
 * @usage null
 */
@RunWith(AndroidJUnit4::class)
class StoryScriptTest {
    lateinit var script: StoryScript
    val context = ApplicationProvider.getApplicationContext<Context>()

    @Before
    fun setUp() {
        script = StoryScript(context, object : IScript {
            override fun handleGlobalChanged() {
                println("handleGlobalChanged")
            }
        }).also {
            it.onCreate()
        }
    }

    fun parse(text: String): JSONArray? {
        val obj = script.parse(text)
        Log.e("parse", obj?.let { it::class }.toString())
        Log.e("parse", (obj).toString())
        val list = obj as? ArrayList<*> ?: return null
        return JSONArray(list)
    }

    fun JSONObject.eq(target: JSONObject): Boolean {
        for ((k, v) in innerMap) {
            val value = target.get(k)
            if (v is JSONObject) {
                if (value is JSONObject) {
                    return v.eq(value)
                } else {
                    return false
                }
            } else if(v is JSONArray){
                if (value is JSONArray) {
                    return v.eq(value)
                } else {
                    return false
                }
            } else if(v is List<*>){
                if (value is List<*>) {
                    return JSONArray(v).eq(JSONArray(value))
                } else {
                    return false
                }
            } else if(v is Map<*,*>){
                if (value is Map<*,*>) {
                    return JSONObject(v as Map<String,*>).eq(JSONObject(value as Map<String,*>))
                } else {
                    return false
                }
            } else {
                if (v != value) {
                    return false
                }
            }
        }
        return true
    }

    fun JSONArray.eq(target: JSONArray): Boolean {
        return mapIndexed { index, any ->
            when (any) {
                is Map<*, *> -> {
                    val targetValue = JSONObject(any as Map<String, *>)
                    val sourceValue = JSONObject(target[index] as Map<String, *>)
                    targetValue.eq(sourceValue)
                }
                is List<*> -> {
                    JSONArray(any).eq(JSONArray(target[index] as List<*>))
                }
                is JSONArray -> {
                    any.eq(target[index] as JSONArray)
                }
                is JSONObject -> {
                    any.eq(target[index] as JSONObject)
                }
                else -> {
                    true
                }
            }
        }.all { it }
    }

    infix fun String.runEq(result: String): Boolean {
        val obj = parse(this) ?: return false
        val resultObj = JSON.parse(result) as JSONArray
        Log.e("runEq", (obj).toString())
        Log.e("runEq", (resultObj.eq(obj)).toString())
        return resultObj.eq(obj)
    }

    @Test
    fun textContentScript() {
        println("parse script starts with `@`")
        assertTrue(
            "@name flag" runEq """[{
                type: 'content',
                command: 'name',
                flags: ['flag'],
                params: {}
            }]
            """
        )
        println("parse script wrapped with `[]`")
        assertTrue(
            "[name flag]" runEq """[{
                type: 'content',
                command: 'name',
                flags: ['flag'],
                params: {}
            }]"""
        )
        println("parse no parameter")
        assertTrue(
            "[name]" runEq """[{
                type: 'content',
                command: 'name',
                flags: [],
                params: {}
            }]"""
        )
        println("parse parameter value of ascii string")
        assertTrue(
            "[name param=\"string\"]" runEq """[{
                type: 'content',
                command: 'name',
                flags: [],
                params: { param: { type: 'value', value: 'string' } }
            }]"""
        )
        println("parse parameter value of non-ascii string")
        assertTrue(
            "[name param=\"中文测试,日本語の分析テスト\" param2=\'中a文s\\测**|/试%……%\']" runEq """[{
                type: 'content',
                command: 'name',
                flags: [],
                params: {
                    param: { type: 'value', value: '中文测试,日本語の分析テスト'},
                    param2: { type: 'value', value: '中a文s\\测**|/试%……%'}
                }
            }]"""
        )
        println("parse parameter value of number")
        assertTrue(
            "[name param1=123 param2=00123 param3=0x123 param4=-10 param5=+0x20 param6=10.02 param7=.4]" runEq """[{
                type: 'content',
                command: 'name',
                flags: [],
                params: {
                    param1: { type: 'value', value: 123},
                    param2: { type: 'value', value: 123},
                    param3: { type: 'value', value: ${0x123}},
                    param4: { type: 'value', value: -10},
                    param5: { type: 'value', value: ${0x20}},
                    param6: { type: 'value', value: 10.02},
                    param7: { type: 'value', value: 0.4},
                }
            }]"""
        )
        println("parse parameter value of boolean")
        assertTrue(
            "[name param=true param2=false]" runEq """[{
                type: 'content',
                command: 'name',
                flags: [],
                params: {
                    param: { type: 'value', value: true},
                    param2: { type: 'value', value: false}
                }
            }]"""
        )
        println("parse parameter value of null")
        assertTrue(
            "[name param=null param2=false]" runEq """[{
                type: 'content',
                command: 'name',
                flags: [],
                params: {
                    param: { type: 'value', value: null},
                    param2: { type: 'value', value: false}
                }
            }]"""
        )
        println("parse parameter value of array")
        assertTrue(
            "[name param1=[1,2,null,4] param2=[1,false,\"test\",[1,2,null]]]" runEq """[{
                type: 'content',
                command: 'name',
                flags: [],
                params: {
                    param1: { type: 'value', value: [1,2,null,4]},
                    param2: { type: 'value', value: [1,false,"test",[1,2,null]]}
                }
            }]"""
        )
//            it('throw when wrong syntex', () => {
//                expect(() => parse('[name param1=xxx]')).to.throw(/Line 1, col 14/);
//                expect(() => parse('[name param1="string]')).to.throw(/Line 1, col 22/);
//                expect(() => parse('[name param1=123true]')).to.throw(/Line 1, col 17/);
//                expect(() => parse('[name param1= 123]')).to.throw(/Line 1, col 14/);
//                expect(() => parse('@name param1=xxx')).to.throw(/Line 1, col 14/);
//                expect(() => parse('@name param1="string')).to.throw(/Line 1, col 21/);
//                expect(() => parse('@name param1=123true')).to.throw(/Line 1, col 17/);
//                expect(() => parse('@name param1= 123')).to.throw(/Line 1, col 14/);
//            });


        println("parse multi lines")
        assertTrue(
            """
            [name param=123]
            [name flag]
            """ runEq """[
                { type: 'content', command: 'name', flags: [], params: { param: { type: 'value', value: 123} } },
                { type: 'content', command: 'name', flags: ['flag'], params: {} }
            ]"""
        )
    }

    @Test
    fun testLogicScript() {
        println("parse IF-ELSEIF-ELSE")

        assertTrue(
            """
            #if x > 1
            [name flagA]
            #elseif y == 2
            #elseif y <= 300
            #else
            [name flagB]
            #end
            [name flagC]
            """ runEq """[
                {
                    type: 'logic', 
                    name: 'if',
                    conditions: [
                        { type: 'expression', value: { left: { type: 'variable', prefix: null, value: 'x' }, operator: '>', right: { type: 'value', value: 1 } }},
                        { type: 'expression', value: { left: { type: 'variable', prefix: null, value: 'y' }, operator: '==', right: { type: 'value', value: 2 } }},
                        { type: 'expression', value: { left: { type: 'variable', prefix: null, value: 'y' }, operator: '<=', right: { type: 'value', value: 300 } }}
                    ],
                    blocks: [
                        [{ type: 'content', command: 'name', flags: ['flagA'], params: {} }],
                        [],
                        [],
                        [{ type: 'content', command: 'name', flags: ['flagB'], params: {} }]
                    ]
                },
                { type: 'content', command: 'name', flags: ['flagC'], params: {} }
            ]"""
        )
        println("parse WHILE")
        assertTrue(
            """
            [name flagA]
            #while x > 1
            [name flagB]
            #end
            [name flagC]
            """ runEq """[
                { type: 'content', command: 'name', flags: ['flagA'], params: {} },
                {
                    type: 'logic', name: 'while',
                    condition: {
                        type: 'expression',
                        value: {
                            left: { type: 'variable', prefix: null, value: 'x' },
                            operator: '>',
                            right: { type: 'value', value: 1 }
                        }
                    },
                    block: [{ type: 'content', command: 'name', flags: ['flagB'], params: {} }]
                },
                { type: 'content', command: 'name', flags: ['flagC'], params: {} }
            ]"""
        )
        println("parse FOREACH")
        assertTrue(
            """
            [name flagA]
            #foreach child in children
            [name flagB]
            #end
            [name flagC]
            """ runEq """[
                { type: 'content', command: 'name', flags: ['flagA'], params: {} },
                {
                    type: 'logic', name: 'foreach',
                    child: { type: 'variable', prefix: null, value: 'child' },
                    children: { type: 'variable', prefix: null, value: 'children' },
                    block: [{ type: 'content', command: 'name', flags: ['flagB'], params: {} }]
                },
                { type: 'content', command: 'name', flags: ['flagC'], params: {} }
            ]"""
        )
        println("parse LET")
        assertTrue(
            """
            [name flagA]
            #let variable = "123"
            #let variable2 = variable
            #let variable3
            [name flagB]
            #variable4 = true
            """ runEq """[
                { type: 'content', command: 'name', flags: ['flagA'], params: {} },
                {
                    type: 'logic', name: 'let',
                    explicit: true,
                    left: { type: 'variable', prefix: null, value: 'variable' },
                    right: { type: 'value', value: '123' },
                },
                {
                    type: 'logic', name: 'let',
                    explicit: true,
                    left: { type: 'variable', prefix: null, value: 'variable2' },
                    right: { type: 'variable', prefix: null, value: 'variable' },
                },
                {
                    type: 'logic', name: 'let',
                    explicit: true,
                    left: { type: 'variable', prefix: null, value: 'variable3' },
                    right: { type: 'value', value: null },
                },
                { type: 'content', command: 'name', flags: ['flagB'], params: {} },
                {
                    type: 'logic', name: 'let',
                    explicit: false,
                    left: { type: 'variable', prefix: null, value: 'variable4' },
                    right: { type: 'value', value: true },
                }
            ]"""
        )

        println("parse computation")
        assertTrue(
            """#let x = 1 - 22.3 + 4""" runEq """[{
                type: "logic",
                name: "let",
                explicit: true,
                left: {
                    prefix: null,
                    type: "variable",
                    value: "x"
                },
                right: {
                    type: "expression",
                    value: {
                        left: {
                            type: "expression",
                            value: {
                                left: {
                                    type: "value",
                                    value: 1
                                },
                                operator: "-",
                                right: {
                                    type: "value",
                                    value: 22.3
                                }
                            }
                        },
                        operator: "+",
                        right: {
                            type: "value",
                            value: 4
                        }
                    }
                }
            }]"""
        )
        assertTrue(
            """#let x = 1 + 2 * 3 + 4 % 2""" runEq """[
                {
                    type: "logic",
                    name: "let",
                    explicit: true,
                    left: {
                        prefix: null,
                        type: "variable",
                        value: "x"
                    },
                    right: {
                        type: "expression",
                        value: {
                            left: {
                                type: "expression",
                                value: {
                                    left: { type: 'value', value: 1 },
                                    operator: '+',
                                    right: {
                                        type: 'expression',
                                        value: {
                                            left: { type: 'value', value: 2 },
                                            operator: '*',
                                            right: { type: 'value', value: 3 }
                                        }
                                    }
                                }
                            },
                            operator: "+",
                            right: {
                                type: "expression",
                                value: {
                                    left: { type: "value", value: 4 },
                                    operator: '%',
                                    right: { type: "value", value: 2 }
                                }
                            }
                        }
                    }
                }
            ]"""
        )
        println("parse complex logic expression")
        assertTrue(
            """
            #while x > 1 + 1 && ((x == 'test' || y >= 30) && a) || (b + 2) * -10
            [name]
            这是一句话，哈哈~！
            [name flagB]
            Some words!
            #end
            """ runEq """[
                {
                    type: 'logic', name: 'while',
                    condition: {
                        type: 'expression',
                        value: {
                            left: {
                                type: 'expression',
                                value: {
                                    left: { type: 'variable', prefix: null, value: 'x' },
                                    operator: '>',
                                    right: {
                                        type: 'expression',
                                        value: {
                                            left: { type: 'value', value: 1 },
                                            operator: '+',
                                            right: { type: 'value', value: 1 }
                                        }
                                    }
                                }
                            },
                            operator: '&&',
                            right: {
                                type: 'expression',
                                value: {
                                    left: {
                                        type: 'expression',
                                        value: {
                                            left: {
                                                type: 'expression',
                                                value: {
                                                    left: {
                                                        type: 'expression',
                                                        value: {
                                                            left: { type: 'variable', prefix: null, value: 'x' },
                                                            operator: '==',
                                                            right: { type: 'value', value: 'test' }
                                                        }
                                                    },
                                                    operator: '||',
                                                    right: {
                                                        type: 'expression',
                                                        value: {
                                                            left: { type: 'variable', prefix: null, value: 'y' },
                                                            operator: '>=',
                                                            right: { type: 'value', value: 30 }
                                                        }
                                                    }
                                                }
                                            },
                                            operator: '&&',
                                            right: { type: 'variable', prefix: null, value: 'a' },
                                        }
                                    },
                                    operator: '||',
                                    right: {
                                        type: 'expression',
                                        value: {
                                            left: {
                                                type: 'expression',
                                                value: {
                                                    left: { type: 'variable', prefix: null, value: 'b' },
                                                    operator: '+',
                                                    right: { type: 'value', value: 2 }
                                                }
                                            },
                                            operator: '*',
                                            right: {
                                                type: 'expression',
                                                value: {
                                                    left: { type: 'value', value: 0 },
                                                    operator: '-',
                                                    right: { type: 'value', value: 10 }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    block: [
                        { type: 'content', command: 'name', flags: [], params: {} },
                        { type: 'content', command: '*', flags: [], params: { raw: { type: 'value', value: '这是一句话，哈哈~！' } } },
                        { type: 'content', command: 'name', flags: ['flagB'], params: {} },
                        { type: 'content', command: '*', flags: [], params: { raw: { type: 'value', value: 'Some words!' } } }
                    ]
                }
            ]"""
        )
    }

    @After
    fun tearDown() {
        script.onDestroy()
    }
}