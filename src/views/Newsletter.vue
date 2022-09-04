<script setup>
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

const content = ref('')
const subject = ref('')

const sendBtnClick = async () => {
  await userStore.sendNewsletter({
    subject: subject.value,
    html: content.value,
  })
}
</script>

<template>
  <div class="newsletter">
    <h1>Sending Newsletter</h1>
    <div class="subject">
      <input type="text" placeholder="Subject" v-model="subject" />
      <!-- <h2>Subject of Newsletter</h2> -->
    </div>

    <div class="editor-div">
      <QuillEditor
        class="editor"
        theme="snow"
        toolbar="full"
        content-type="html"
        v-model:content="content"
      />
    </div>

    <!-- <teleport to="#wysiwyg-preview"> -->
    <div class="preview" v-html="content"></div>
    <!-- </teleport> -->
    <button class="send-btn" @click="sendBtnClick">Send</button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/rootCSS.scss';
@import '@/sass/mixins/primary-btn.scss';

.newsletter {
  padding: 20px 200px;

  // changing the css what was set in root
  transition: initial;
  line-height: initial;
  font-size: initial;
  text-rendering: initial;
  -webkit-font-smoothing: initial;
  -moz-osx-font-smoothing: initial;

  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 50px;
  }
  .subject {
    margin-bottom: 50px;

    input {
      width: 100%;
      font-size: 16px;
      padding: 5px;
      border-top: none;
      border-right: none;
      border-left: none;
      outline: none;
      border-bottom: 1.5px solid rgb(111, 111, 111);
    }
  }
  .editor-div {
    margin-bottom: 20px;
    .editor {
      //
    }
  }
  .preview {
    margin-bottom: 20px;
  }

  .send-btn {
    @include primary-btn;
    height: 48px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.4px;
  }
}
</style>
