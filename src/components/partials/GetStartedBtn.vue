<script setup>
import { GET_STARTED } from "../../constants";
</script>

<template>
  <button>{{ GET_STARTED }}</button>
</template>

<style lang="scss" scoped>
button {
  margin-left: 1em;
  padding: 0.5em 1.5em;
  height: 40px;
  width: 160px;
  font-size: 1.1em;
  text-align: center;
  border-radius: 0.35em;
  border: none;
  background: #13f195;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    position: relative;
    background: #fff;
    box-shadow: 0px 1px 20px 0px #13f195;
  }
}
</style>
