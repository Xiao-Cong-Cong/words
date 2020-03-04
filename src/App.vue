<template>
  <div id="app">
    <WordsList></WordsList>
  </div>
</template>

<script>
  import WordsList from './components/WordsList'
  export default {
    name: "App",
    components: {
      WordsList
    }
  }
</script>