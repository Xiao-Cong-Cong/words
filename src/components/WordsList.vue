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
export default {
  name: 'WordsList',
  data() {
    return {
      words: [
        {
          id: 1,
          word: 'yelp',
          count: 1,
        },
        {
          id: 2,
          word: 'yawn',
          count: 1,
        },
        {
          id: 3,
          word: 'wrinkle',
          count: 1,
        },
        {
          id: 4,
          word: 'wring',
          count: 1,
        },
        {
          id: 5,
          word: 'wither',
          count: 1
        },
        {
          id: 6,
          word: 'wit',
          count: 1
        },
        {
          id: 7,
          word: 'wholesome',
          count: 1
        },
        {
          id: 8,
          word: 'whittle',
          count: 1
        }
      ],
      newWord: '',
      idx: 9
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
    addNewWord() {
      this.words.push({
        id: this.idx++,
        word: this.newWord,
        count: 1
      });
      this.newWord = '';
    },
    addWordCount(idx) {
      for( var i = 0; i < this.words.length; i++) {
        if(this.words[i].id === idx) {
          this.words[i].count++;
        }
      }
    }
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
