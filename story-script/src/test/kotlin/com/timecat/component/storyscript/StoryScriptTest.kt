package com.timecat.component.storyscript

import com.alibaba.fastjson.JSON
import org.json.JSONObject
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test


/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/18
 * @description null
 * @usage null
 */
internal class StoryScriptTest {
    val script = StoryScript()
    @BeforeEach
    fun setUp() {
        script.engine
    }

    fun parse(text: String): JSONObject? {
        script.engine.eval(text)
        val scriptString = text
        """
            //import Story from 'avg-storyscript';
            function parseScript(scriptString) {
                const story = new StoryScript();
                story.load(scriptString);
                for (const line of story) {
                    //do something
                }
                return story;
            }
        """.trimIndent()
        return null
    }

    infix fun String.runEq(result: String): Boolean {
        val obj = parse(this) ?: return false
        val resultObj = JSON.parse(result)
        return resultObj.equals(obj)
    }

    @Test
    fun textContentScript() {
        print("parse script starts with `@`")
        assert(
            "@name flag" runEq """
            [{
                        type: 'content',
                        command: 'name',
                        flags: ['flag'],
                        params: {}
                    }]
        """
        )
        print("parse script wrapped with `[]`")
        assert(
            "[name flag]" runEq """[{
                type: 'content',
                command: 'name',
                flags: ['flag'],
                params: {}
            }]"""
        )
        print("parse no parameter")
        assert(
            "[name]" runEq """[{
                type: 'content',
                command: 'name',
                flags: [],
                params: {}
            }]"""
        )
        print("parse parameter value of ascii string")
        assert(
            "[name param=\"string\"]" runEq """[{
                type: 'content',
                command: 'name',
                flags: [],
                params: { param: { type: 'value', value: 'string' } }
            }]"""
        )
        print("parse parameter value of non-ascii string")
        assert(
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
        print("parse parameter value of number")
        assert(
            "[name param1=123 param2=00123 param3=0x123 param4=-10 param5=+0x20 param6=10.02 param7=.4]" runEq """[{
                type: 'content',
                command: 'name',
                flags: [],
                params: {
                    param1: { type: 'value', value: 123},
                    param2: { type: 'value', value: 123},
                    param3: { type: 'value', value: 0x123},
                    param4: { type: 'value', value: -10},
                    param5: { type: 'value', value: 0x20},
                    param6: { type: 'value', value: 10.02},
                    param7: { type: 'value', value: 0.4},
                }
            }]"""
        )
        print("parse parameter value of boolean")
        assert(
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
        print("parse parameter value of null")
        assert(
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
        print("parse parameter value of array")
        assert(
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


        print("parse multi lines")
        assert(
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
        print("parse IF-ELSEIF-ELSE")

        assert(
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
                    type: 'logic', name: 'if',
                    conditions: [
                    { type: 'expression', value: { left: { type: 'variable', prefix: null, value: 'x' }, operator: '>', right: { type: 'value', value: 1 } }},
                    { type: 'expression', value: { left: { type: 'variable', prefix: null, value: 'y' }, operator: '==', right: { type: 'value', value: 2 } }},
                    { type: 'expression', value: { left: { type: 'variable', prefix: null, value: 'y' }, operator: '<=', right: { type: 'value', value: 300 } }}
                    ],
                    blocks: [
                    [{ type: 'content', command: 'name', flags: ['flagA'], params: {} }],
                    [],[],
                    [{ type: 'content', command: 'name', flags: ['flagB'], params: {} }]
                    ]
                },
                { type: 'content', command: 'name', flags: ['flagC'], params: {} }
            ]"""
        )
        print("parse WHILE")
        assert(
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
        print("parse FOREACH")
        assert(
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
        print("parse LET")
        assert(
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

        print("parse computation")
        assert(
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
        assert(
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
        print("parse complex logic expression")
        assert(
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

    @AfterEach
    fun tearDown() {
    }
}