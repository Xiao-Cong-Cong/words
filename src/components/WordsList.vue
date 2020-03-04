<template>
  <div class="main">
    <div align="center">
      <h1>Words List</h1>
    </div>
      <ul>
        <li v-for="word in sortedWords" :key="word.id">
          <span class="words-list-word">{{ word.word }}</span>
          <span class="words-list-plus-button">
            <button @click="addWordCount(word.id)">+</button>
            <!-- {{ word.count }} -->
          </span>
        </li>
      </ul>
    <div align="center">
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
      }
    },
    methods: {
      update() {
        this.words = [];
        api.getWords().then(({data}) => {
          if(data.success) {
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
      addWordCount(idx) {
        api.addWordCount({id: idx}).then(({data}) => {
          if(data.success) {
            for( var i = 0; i < this.words.length; i++) {
              if(this.words[i].id === idx) {
                this.words[i].count++;
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

  .words-list-word {
    width: 160px;
    display: inline-block;
  }
</style>
