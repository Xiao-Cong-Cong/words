<template>
  <div class="main">
    <div align="center">
      <h1>Words List</h1>
    </div>
    <div class="words-list">
      <ul>
        <li v-for="word in displayWords" :key="word.id">
          <span class="words-list-word">{{ word.word }}</span>
          <span>
            <button @click="reduceWordCount(word.id)"> √ </button>
            <!-- {{ word.count }} -->
          </span>
        </li>
      </ul>
    </div>
    <div align="center" class="words-list-add">
      <input v-model="newWord" @keyup.enter="addNewWord">
    </div>
  </div>
</template>

<script>
  import api from '../axios';
  export default {
    name: 'WordsList',
    data() {
      return {
        words: [],
        newWord: ''
      }
    },
    computed: {
      sortedWords: function() {
        var tmp = this.words;
        return tmp.sort(cmp);

        function cmp(a, b) {
          return b.count - a.count;
        }
      },
      displayWords: function() {
        return this.sortedWords.filter(word => word.count > 0);
      }
    },
    methods: {
      update() {
        api.getWords().then(({data}) => {
          if(data.success) {
            this.words = [];
            this.words = data.words;
          }
        })
      },
      addNewWord() {
        api.addNewWord({word: this.newWord}).then(({data}) => {
          if(data.success) {
            this.newWord = '';
            this.update();
          }
        });
      },
      reduceWordCount(idx) {
        api.reduceWordCount({id: idx}).then(({data}) => {
          if(data.success) {
            for( var i = 0; i < this.words.length; i++) {
              if(this.words[i].id === idx) {
                this.words[i].count--;
              }
            }
          }
        })
      }
    },
    mounted() {
      this.update();
    }
  }
</script>

<style scoped>
  .main {
    border: 2px;
    border-style: dotted;
    width: 250px;
    padding-bottom: 20px;
    margin: 0 auto;
  }

  .words-list {
    overflow: scroll;
    max-height: 500px;
  }

  .words-list-word {
    width: 160px;
    display: inline-block;
  }

  .words-list-add {
    padding-top: 15px;
  }
</style>
