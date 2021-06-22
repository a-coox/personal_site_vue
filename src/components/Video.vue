<template>
  <iframe
    :width="width"
    :height="height"
    :src="`https://www.youtube-nocookie.com/embed/${id}`"
    :title="title"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 480
    },
    id: {
      type: String, //IkCqFwkAIN8
      default: ""
    },
    title: {
      type: String,
      default: "Video Title"
    }
  }
}
</script>
