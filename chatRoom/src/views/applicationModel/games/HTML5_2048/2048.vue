<template>
    <div class="vchat-h2048">
        <header>
            <div class="container">
                <h1><span>2</span><span>0</span><span>4</span><span>8</span></h1>
            </div>
        </header>

        <div class="container">
            <div class="directions">
                <p><strong>How to play：</strong> Use the mouse arrow keys to move the number box. Two adjacent square numbers are the same, they can be combined into one!</p>
            </div>
            <div class="scores">
                <div class="score-container best-score">
                    The best:
                    <div class="score">
                    <div id="bestScore">0</div>
                </div>
                </div>
                <div class="score-container">
                    Score:
                    <div class="score">
                    <div id="score">0</div>
                    <div class="add" id="add"></div>
                </div>
                </div>
            </div>
            <div class="game">
                <div id="tile-container" class="tile-container"></div>
                <div class="end" id="end">Game end<div class="monkey">🙈</div><button class="btn not-recommended__item js-restart-btn" id="try-again">再试一次</button></div>
            </div>

            <div class="not-recommended">
                <button class="btn not-recommended__item js-restart-btn" id="restart">Restart game</button>
                <span class="not-recommended__annotation"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import newGameStart from './js/index'
    export default{
        data() {
            return {

            }
        },
        mounted() {
            this.$nextTick(_ => {
                newGameStart();
            })
        }
    }
</script>

<style lang="scss">
    .vchat-h2048{
        @import "css/style.scss";
    }
</style>
