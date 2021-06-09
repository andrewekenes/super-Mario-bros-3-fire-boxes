namespace SpriteKind {
    export const mark = SpriteKind.create()
    export const boss = SpriteKind.create()
    export const ball = SpriteKind.create()
    export const thowball = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.thowball, SpriteKind.boss, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.destroy()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vy == 0) {
        mySprite.vy = -150
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    tiles.setTilemap(tilemap`final-boss`)
    info.setLife(10)
    mySprite2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.mark)
    boss = sprites.create(img`
        5 5 5 . . . 5 5 5 . . . . 5 5 5 
        5 3 5 5 5 5 5 7 5 5 5 5 5 5 a 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 f 2 2 2 f 2 2 2 2 2 2 
        2 2 2 2 2 f 2 2 2 f 2 2 2 2 2 2 
        2 2 2 2 2 f 2 2 2 f 2 2 2 2 2 2 
        2 2 2 2 2 f 2 2 2 f 2 2 2 2 2 2 
        2 2 2 2 2 f 2 2 2 f 2 2 2 2 2 2 
        2 2 2 2 2 f 2 2 2 f 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        `, SpriteKind.boss)
    tiles.placeOnRandomTile(boss, assets.tile`myTile0`)
    mySprite.setPosition(mySprite2.x, mySprite2.y)
    scene.cameraFollowSprite(mySprite)
    scene.setBackgroundColor(15)
    boss.follow(mySprite, 80)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    carry = 1
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    walk = 1
    pause(100)
    walk = 0
    pause(100)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    walk = 1
    pause(100)
    walk = 0
    pause(100)
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    walk = 0
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    walk = 0
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    walk = 1
    pause(100)
    walk = 0
    pause(100)
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    carry = 0
    if (carrying == 1) {
        throw_ball = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . c c c c c c c . . . . . 
            . . . c b b b b b b b c . . . . 
            . . c b b f f b b b b b c . . . 
            . c b b f b b b b b b b b c . . 
            . c b f b b b b b b b b b c . . 
            . c b f b b b b b b b b b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b b b b b b b b b c . . 
            . . c b b b b b b b b b c . . . 
            . . . c b b b b b b b c . . . . 
            . . . . c c c c c c c . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.thowball)
        carrying = 0
        throw_ball.setFlag(SpriteFlag.GhostThroughWalls, true)
        throw_ball.setPosition(mySprite.x, mySprite.y)
        throw_ball.setVelocity(0, -100)
    }
})
info.onLifeZero(function () {
    game.over(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ball, function (sprite, otherSprite) {
    if (carry == 1) {
        otherSprite.destroy()
        carrying = 1
    } else {
        game.over(false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (otherSprite.vy == 0) {
        game.over(false)
    } else {
        if (sprite.vy > otherSprite.vy) {
            otherSprite.destroy(effects.fire, Infinity)
        } else {
            game.over(false)
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    walk = 1
    pause(100)
    walk = 0
    pause(100)
})
let ball: Sprite = null
let throw_ball: Sprite = null
let boss: Sprite = null
let mySprite2: Sprite = null
let fire_box: Sprite = null
let walk = 0
let carry = 0
let carrying = 0
let mySprite: Sprite = null
scene.setBackgroundColor(9)
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . f f f f f f . . . . . 
    . . . . f 2 2 2 2 2 2 f f . . . 
    . . . f 2 2 2 2 2 2 2 2 2 f . . 
    . . . f f f d d f d f f f . . . 
    . . f d d f f d f d d d d f . . 
    . . f d d f f d d f d d d f . . 
    . . . f f d d d f f f f f . . . 
    . . . . f f d d d d d f . . . . 
    . . . f 2 2 f f 2 2 f . . . . . 
    . . f 2 2 2 2 f f 2 2 f . . . . 
    . . f 2 2 2 2 f f f f f . . . . 
    . . . f d d d f f d f f . . . . 
    . . . f d d 2 2 2 f f f . . . . 
    . . . . f 2 2 2 2 2 f . . . . . 
    . . . . f f f f f f f . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
tiles.setTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
mySprite.ay = 350
carrying = 0
carry = 0
walk = 0
for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
    fire_box = sprites.create(img`
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
        2 2 f 2 2 2 f 2 2 2 2 2 2 2 2 2 
        2 2 f 2 2 2 f 2 2 2 2 2 2 2 2 2 
        2 2 f 2 2 2 f 2 2 2 2 2 2 2 2 2 
        2 2 f 2 2 2 f 2 2 2 2 2 2 2 2 2 
        2 2 f 2 2 2 f 2 2 2 2 2 2 2 2 2 
        2 2 f 2 2 2 f 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        `, SpriteKind.Enemy)
    tiles.setTileAt(value, assets.tile`transparency16`)
    tiles.placeOnTile(fire_box, value)
}
game.onUpdate(function () {
    mySprite.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . f 2 2 2 2 2 2 f f . . . 
        . . . f 2 2 2 2 2 2 2 2 2 f . . 
        . . . f f f d d f d f f f . . . 
        . . f d d f f d f d d d d f . . 
        . . f d d f f d d f d d d f . . 
        . . . f f d d d f f f f f . . . 
        . . . . f f d d d d d f . . . . 
        . . . f 2 2 f f 2 2 f . . . . . 
        . . f 2 2 2 2 f f 2 2 f . . . . 
        . . f 2 2 2 2 f f f f f . . . . 
        . . . f d d d f f d f f . . . . 
        . . . f d d 2 2 2 f f f . . . . 
        . . . . f 2 2 2 2 2 f . . . . . 
        . . . . f f f f f f f . . . . . 
        `)
    controller.moveSprite(mySprite, 100, 0)
    if (controller.up.isPressed()) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . f f f f . . . . . 
            . . . . . f f 2 2 2 2 f f . . . 
            . . . . f f 2 f f f f f f f . . 
            . . . f 2 f f f f f f f f . . . 
            . . . f f f d f d d f d d f . . 
            . . f d d f d d f d f d d f . . 
            . . f d d f d d d f f f f . . . 
            . . . f f d d f f f d f . . . . 
            . . . . . f f d d d d f . . . . 
            . . . f f f f f 2 2 f . . . . . 
            . . f 2 2 f f f f 2 2 f . . . . 
            . f 2 2 2 2 f f f f f f . . . . 
            . f 2 2 2 2 f f f d f f . . . . 
            . . f d d d f 2 2 f f f . . . . 
            . . f d d 2 2 2 2 2 f . . . . . 
            . . . . f f f f f f f . . . . . 
            `)
        controller.moveSprite(mySprite, 0, 0)
    } else {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f 2 2 2 2 2 2 f f . . . 
            . . . f 2 2 2 2 2 2 2 2 2 f . . 
            . . . f f f d d f d f f f . . . 
            . . f d d f f d f d d d d f . . 
            . . f d d f f d d f d d d f . . 
            . . . f f d d d f f f f f . . . 
            . . . . f f d d d d d f . . . . 
            . . . f 2 2 f f 2 2 f . . . . . 
            . . f 2 2 2 2 f f 2 2 f . . . . 
            . . f 2 2 2 2 f f f f f . . . . 
            . . . f d d d f f d f f . . . . 
            . . . f d d 2 2 2 f f f . . . . 
            . . . . f 2 2 2 2 2 f . . . . . 
            . . . . f f f f f f f . . . . . 
            `)
        if (walk == 1) {
            mySprite.setImage(img`
                . . . . . f f f f f . . . . . . 
                . . . . f 2 2 2 2 2 f f f . . . 
                . . . f 2 2 2 2 2 2 2 2 2 f . . 
                . . . f f f d d f d f f f . . . 
                . . f d d f f d f d d d d f . . 
                . . f d d f f d d f d d d f . . 
                . . . f f d d d f f f f f . . . 
                . . . f f f d d d d d f . . . . 
                . f f 2 2 2 f f 2 2 f f f . . . 
                f d d 2 2 2 2 f f 2 2 f 2 f . . 
                f d d d 2 2 f f f f f f 2 d f . 
                . f d d f f f f d f f d f d f . 
                . . f f f f f f f f f 2 2 f . . 
                . f 2 2 f f f f f f 2 2 2 f . . 
                . f 2 2 2 f . . f 2 2 2 f . . . 
                . . f f f . . . . f f f . . . . 
                `)
            if (mySprite.vy > 0) {
                mySprite.setImage(img`
                    . . . . . f f f f f . . f f f . 
                    . . . . f 2 2 2 2 2 f f d d d f 
                    . . . f 2 2 2 2 2 2 2 2 f d d f 
                    . . . f f f d d f d f f f 2 f . 
                    . . f d d f f d f d d d d 2 f . 
                    . . f d d f f d d f d d d 2 f . 
                    . . . f f d d d f f f f f f . . 
                    . . . . f f d d d d d d d f . . 
                    . . f 2 2 2 f 2 2 2 f 2 f . . . 
                    . f f f 2 2 2 f 2 2 2 f f f f . 
                    f d d d f 2 2 f d f f d f 2 2 f 
                    f d d d f 2 f f f f f f 2 2 2 f 
                    . f 2 f f f f f f f f f 2 2 f . 
                    f 2 2 2 f f f f f f f f 2 2 f . 
                    f 2 2 f f f f f f . . . f f . . 
                    . f f . f f f . . . . . . . . . 
                    `)
            } else {
            	
            }
            if (mySprite.vy < 0) {
                mySprite.setImage(img`
                    . . . . . f f f f f . . f f f . 
                    . . . . f 2 2 2 2 2 f f d d d f 
                    . . . f 2 2 2 2 2 2 2 2 f d d f 
                    . . . f f f d d f d f f f 2 f . 
                    . . f d d f f d f d d d d 2 f . 
                    . . f d d f f d d f d d d 2 f . 
                    . . . f f d d d f f f f f f . . 
                    . . . . f f d d d d d d d f . . 
                    . . f 2 2 2 f 2 2 2 f 2 f . . . 
                    . f f f 2 2 2 f 2 2 2 f f f f . 
                    f d d d f 2 2 f d f f d f 2 2 f 
                    f d d d f 2 f f f f f f 2 2 2 f 
                    . f 2 f f f f f f f f f 2 2 f . 
                    f 2 2 2 f f f f f f f f 2 2 f . 
                    f 2 2 f f f f f f . . . f f . . 
                    . f f . f f f . . . . . . . . . 
                    `)
            } else {
                mySprite.setImage(img`
                    . . . . . f f f f f . . . . . . 
                    . . . . f 2 2 2 2 2 f f f . . . 
                    . . . f 2 2 2 2 2 2 2 2 2 f . . 
                    . . . f f f d d f d f f f . . . 
                    . . f d d f f d f d d d d f . . 
                    . . f d d f f d d f d d d f . . 
                    . . . f f d d d f f f f f . . . 
                    . . . f f f d d d d d f . . . . 
                    . f f 2 2 2 f f 2 2 f f f . . . 
                    f d d 2 2 2 2 f f 2 2 f 2 f . . 
                    f d d d 2 2 f f f f f f 2 d f . 
                    . f d d f f f f d f f d f d f . 
                    . . f f f f f f f f f 2 2 f . . 
                    . f 2 2 f f f f f f 2 2 2 f . . 
                    . f 2 2 2 f . . f 2 2 2 f . . . 
                    . . f f f . . . . f f f . . . . 
                    `)
            }
        } else {
            mySprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . f f f f f f . . . . . 
                . . . . f 2 2 2 2 2 2 f f . . . 
                . . . f 2 2 2 2 2 2 2 2 2 f . . 
                . . . f f f d d f d f f f . . . 
                . . f d d f f d f d d d d f . . 
                . . f d d f f d d f d d d f . . 
                . . . f f d d d f f f f f . . . 
                . . . . f f d d d d d f . . . . 
                . . . f 2 2 f f 2 2 f . . . . . 
                . . f 2 2 2 2 f f 2 2 f . . . . 
                . . f 2 2 2 2 f f f f f . . . . 
                . . . f d d d f f d f f . . . . 
                . . . f d d 2 2 2 f f f . . . . 
                . . . . f 2 2 2 2 2 f . . . . . 
                . . . . f f f f f f f . . . . . 
                `)
        }
        if (mySprite.vy > 0) {
            mySprite.setImage(img`
                . . . . . f f f f f . . f f f . 
                . . . . f 2 2 2 2 2 f f d d d f 
                . . . f 2 2 2 2 2 2 2 2 f d d f 
                . . . f f f d d f d f f f 2 f . 
                . . f d d f f d f d d d d 2 f . 
                . . f d d f f d d f d d d 2 f . 
                . . . f f d d d f f f f f f . . 
                . . . . f f d d d d d d d f . . 
                . . f 2 2 2 f 2 2 2 f 2 f . . . 
                . f f f 2 2 2 f 2 2 2 f f f f . 
                f d d d f 2 2 f d f f d f 2 2 f 
                f d d d f 2 f f f f f f 2 2 2 f 
                . f 2 f f f f f f f f f 2 2 f . 
                f 2 2 2 f f f f f f f f 2 2 f . 
                f 2 2 f f f f f f . . . f f . . 
                . f f . f f f . . . . . . . . . 
                `)
        }
        if (mySprite.vy < 0) {
            mySprite.setImage(img`
                . . . . . f f f f f . . f f f . 
                . . . . f 2 2 2 2 2 f f d d d f 
                . . . f 2 2 2 2 2 2 2 2 f d d f 
                . . . f f f d d f d f f f 2 f . 
                . . f d d f f d f d d d d 2 f . 
                . . f d d f f d d f d d d 2 f . 
                . . . f f d d d f f f f f f . . 
                . . . . f f d d d d d d d f . . 
                . . f 2 2 2 f 2 2 2 f 2 f . . . 
                . f f f 2 2 2 f 2 2 2 f f f f . 
                f d d d f 2 2 f d f f d f 2 2 f 
                f d d d f 2 f f f f f f 2 2 2 f 
                . f 2 f f f f f f f f f 2 2 f . 
                f 2 2 2 f f f f f f f f 2 2 f . 
                f 2 2 f f f f f f . . . f f . . 
                . f f . f f f . . . . . . . . . 
                `)
        }
    }
    if (controller.A.isPressed()) {
        if (carrying == 1) {
            mySprite.setImage(img`
                ..................
                ..................
                ..................
                ..cccccffffff.....
                .cbffbbc22222ff...
                .cfbbbbc2222222f..
                .cfbbbbcddfdfff...
                .cbbbbbcfdfddddf..
                .cbbbbbcfddfdddf..
                ..cccccfddfffff...
                .....fddfddddf....
                .....fdddf22f.....
                ....f2222ff22f....
                ....f2222fffff....
                .....f22fffdff....
                ......ff222fff....
                ......f22222f.....
                ......fffffff.....
                `)
        }
    } else {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f 2 2 2 2 2 2 f f . . . 
            . . . f 2 2 2 2 2 2 2 2 2 f . . 
            . . . f f f d d f d f f f . . . 
            . . f d d f f d f d d d d f . . 
            . . f d d f f d d f d d d f . . 
            . . . f f d d d f f f f f . . . 
            . . . . f f d d d d d f . . . . 
            . . . f 2 2 f f 2 2 f . . . . . 
            . . f 2 2 2 2 f f 2 2 f . . . . 
            . . f 2 2 2 2 f f f f f . . . . 
            . . . f d d d f f d f f . . . . 
            . . . f d d 2 2 2 f f f . . . . 
            . . . . f 2 2 2 2 2 f . . . . . 
            . . . . f f f f f f f . . . . . 
            `)
        if (walk == 1) {
            mySprite.setImage(img`
                . . . . . f f f f f . . . . . . 
                . . . . f 2 2 2 2 2 f f f . . . 
                . . . f 2 2 2 2 2 2 2 2 2 f . . 
                . . . f f f d d f d f f f . . . 
                . . f d d f f d f d d d d f . . 
                . . f d d f f d d f d d d f . . 
                . . . f f d d d f f f f f . . . 
                . . . f f f d d d d d f . . . . 
                . f f 2 2 2 f f 2 2 f f f . . . 
                f d d 2 2 2 2 f f 2 2 f 2 f . . 
                f d d d 2 2 f f f f f f 2 d f . 
                . f d d f f f f d f f d f d f . 
                . . f f f f f f f f f 2 2 f . . 
                . f 2 2 f f f f f f 2 2 2 f . . 
                . f 2 2 2 f . . f 2 2 2 f . . . 
                . . f f f . . . . f f f . . . . 
                `)
            if (mySprite.vy > 0) {
                mySprite.setImage(img`
                    . . . . . f f f f f . . f f f . 
                    . . . . f 2 2 2 2 2 f f d d d f 
                    . . . f 2 2 2 2 2 2 2 2 f d d f 
                    . . . f f f d d f d f f f 2 f . 
                    . . f d d f f d f d d d d 2 f . 
                    . . f d d f f d d f d d d 2 f . 
                    . . . f f d d d f f f f f f . . 
                    . . . . f f d d d d d d d f . . 
                    . . f 2 2 2 f 2 2 2 f 2 f . . . 
                    . f f f 2 2 2 f 2 2 2 f f f f . 
                    f d d d f 2 2 f d f f d f 2 2 f 
                    f d d d f 2 f f f f f f 2 2 2 f 
                    . f 2 f f f f f f f f f 2 2 f . 
                    f 2 2 2 f f f f f f f f 2 2 f . 
                    f 2 2 f f f f f f . . . f f . . 
                    . f f . f f f . . . . . . . . . 
                    `)
            } else {
                mySprite.setImage(img`
                    . . . . . f f f f f . . . . . . 
                    . . . . f 2 2 2 2 2 f f f . . . 
                    . . . f 2 2 2 2 2 2 2 2 2 f . . 
                    . . . f f f d d f d f f f . . . 
                    . . f d d f f d f d d d d f . . 
                    . . f d d f f d d f d d d f . . 
                    . . . f f d d d f f f f f . . . 
                    . . . f f f d d d d d f . . . . 
                    . f f 2 2 2 f f 2 2 f f f . . . 
                    f d d 2 2 2 2 f f 2 2 f 2 f . . 
                    f d d d 2 2 f f f f f f 2 d f . 
                    . f d d f f f f d f f d f d f . 
                    . . f f f f f f f f f 2 2 f . . 
                    . f 2 2 f f f f f f 2 2 2 f . . 
                    . f 2 2 2 f . . f 2 2 2 f . . . 
                    . . f f f . . . . f f f . . . . 
                    `)
            }
            if (mySprite.vy < 0) {
                mySprite.setImage(img`
                    . . . . . f f f f f . . f f f . 
                    . . . . f 2 2 2 2 2 f f d d d f 
                    . . . f 2 2 2 2 2 2 2 2 f d d f 
                    . . . f f f d d f d f f f 2 f . 
                    . . f d d f f d f d d d d 2 f . 
                    . . f d d f f d d f d d d 2 f . 
                    . . . f f d d d f f f f f f . . 
                    . . . . f f d d d d d d d f . . 
                    . . f 2 2 2 f 2 2 2 f 2 f . . . 
                    . f f f 2 2 2 f 2 2 2 f f f f . 
                    f d d d f 2 2 f d f f d f 2 2 f 
                    f d d d f 2 f f f f f f 2 2 2 f 
                    . f 2 f f f f f f f f f 2 2 f . 
                    f 2 2 2 f f f f f f f f 2 2 f . 
                    f 2 2 f f f f f f . . . f f . . 
                    . f f . f f f . . . . . . . . . 
                    `)
            } else {
                mySprite.setImage(img`
                    . . . . . f f f f f . . . . . . 
                    . . . . f 2 2 2 2 2 f f f . . . 
                    . . . f 2 2 2 2 2 2 2 2 2 f . . 
                    . . . f f f d d f d f f f . . . 
                    . . f d d f f d f d d d d f . . 
                    . . f d d f f d d f d d d f . . 
                    . . . f f d d d f f f f f . . . 
                    . . . f f f d d d d d f . . . . 
                    . f f 2 2 2 f f 2 2 f f f . . . 
                    f d d 2 2 2 2 f f 2 2 f 2 f . . 
                    f d d d 2 2 f f f f f f 2 d f . 
                    . f d d f f f f d f f d f d f . 
                    . . f f f f f f f f f 2 2 f . . 
                    . f 2 2 f f f f f f 2 2 2 f . . 
                    . f 2 2 2 f . . f 2 2 2 f . . . 
                    . . f f f . . . . f f f . . . . 
                    `)
            }
        } else {
            mySprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . f f f f f f . . . . . 
                . . . . f 2 2 2 2 2 2 f f . . . 
                . . . f 2 2 2 2 2 2 2 2 2 f . . 
                . . . f f f d d f d f f f . . . 
                . . f d d f f d f d d d d f . . 
                . . f d d f f d d f d d d f . . 
                . . . f f d d d f f f f f . . . 
                . . . . f f d d d d d f . . . . 
                . . . f 2 2 f f 2 2 f . . . . . 
                . . f 2 2 2 2 f f 2 2 f . . . . 
                . . f 2 2 2 2 f f f f f . . . . 
                . . . f d d d f f d f f . . . . 
                . . . f d d 2 2 2 f f f . . . . 
                . . . . f 2 2 2 2 2 f . . . . . 
                . . . . f f f f f f f . . . . . 
                `)
        }
        if (mySprite.vy > 0) {
            mySprite.setImage(img`
                . . . . . f f f f f . . f f f . 
                . . . . f 2 2 2 2 2 f f d d d f 
                . . . f 2 2 2 2 2 2 2 2 f d d f 
                . . . f f f d d f d f f f 2 f . 
                . . f d d f f d f d d d d 2 f . 
                . . f d d f f d d f d d d 2 f . 
                . . . f f d d d f f f f f f . . 
                . . . . f f d d d d d d d f . . 
                . . f 2 2 2 f 2 2 2 f 2 f . . . 
                . f f f 2 2 2 f 2 2 2 f f f f . 
                f d d d f 2 2 f d f f d f 2 2 f 
                f d d d f 2 f f f f f f 2 2 2 f 
                . f 2 f f f f f f f f f 2 2 f . 
                f 2 2 2 f f f f f f f f 2 2 f . 
                f 2 2 f f f f f f . . . f f . . 
                . f f . f f f . . . . . . . . . 
                `)
        }
        if (mySprite.vy < 0) {
            mySprite.setImage(img`
                . . . . . f f f f f . . f f f . 
                . . . . f 2 2 2 2 2 f f d d d f 
                . . . f 2 2 2 2 2 2 2 2 f d d f 
                . . . f f f d d f d f f f 2 f . 
                . . f d d f f d f d d d d 2 f . 
                . . f d d f f d d f d d d 2 f . 
                . . . f f d d d f f f f f f . . 
                . . . . f f d d d d d d d f . . 
                . . f 2 2 2 f 2 2 2 f 2 f . . . 
                . f f f 2 2 2 f 2 2 2 f f f f . 
                f d d d f 2 2 f d f f d f 2 2 f 
                f d d d f 2 f f f f f f 2 2 2 f 
                . f 2 f f f f f f f f f 2 2 f . 
                f 2 2 2 f f f f f f f f 2 2 f . 
                f 2 2 f f f f f f . . . f f . . 
                . f f . f f f . . . . . . . . . 
                `)
        }
    }
    if (mySprite.vx < 0) {
        mySprite.image.flipX()
    }
})
game.onUpdateInterval(2000, function () {
    for (let fire_box2 of sprites.allOfKind(SpriteKind.Enemy)) {
        fire_box2.ay = 350
        fire_box2.vy = -150
    }
})
game.onUpdateInterval(6000, function () {
    for (let boss of sprites.allOfKind(SpriteKind.boss)) {
        ball = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . c c c c c c c . . . . . 
            . . . c b b b b b b b c . . . . 
            . . c b b f f b b b b b c . . . 
            . c b b f b b b b b b b b c . . 
            . c b f b b b b b b b b b c . . 
            . c b f b b b b b b b b b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b b b b b b b b b c . . 
            . . c b b b b b b b b b c . . . 
            . . . c b b b b b b b c . . . . 
            . . . . c c c c c c c . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.ball)
        ball.setPosition(boss.x, boss.y)
        ball.setFlag(SpriteFlag.GhostThroughWalls, true)
        ball.setVelocity(0, 100)
    }
})
