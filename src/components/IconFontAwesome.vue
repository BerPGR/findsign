<template>
  <FontAwesomeIcon
    :class="{ cursor: isCursor }"
    :icon="icon"
    :size="size"
    :title="title"
  />
</template>

<script lang="ts" setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import type {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import type {PropType} from "vue";

interface SizeType {
  type:
    | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
}

interface TypeInterface {
  type: object | Array<string> | string | IconDefinition;
}

defineProps({
  icon: {
    type: String as PropType<TypeInterface["type"]>,
    required: true,
  },
  size: {
    type: String as PropType<SizeType["type"]>,
    default: "xl",
  },
  isCursor: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    required: false,
  },
});
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>
