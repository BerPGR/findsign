<template>
  <button :class="setType(typeClass)" :disabled="disable" class="btn ms-10">
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import type {PropType} from "vue";
import {watchEffect} from "vue";

interface ClassesProps {
  type:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "dark"
    | "not";
}

const setType = (type: ClassesProps["type"]) => {
  if (type === "not") {
    return "";
  }
  const classes = {
    "btn-primary": type == "primary",
    "btn-secondary": type == "secondary",
    "btn-success": type == "success",
    "btn-danger": type == "danger",
    "btn-warning": type == "warning",
    "btn-dark": type == "dark",
  };
  const classesOutline = {
    "btn-outline-primary": type == "primary",
    "btn-outline-secondary": type == "secondary",
    "btn-outline-success": type == "success",
    "btn-outline-danger": type == "danger",
    "btn-outline-warning": type == "warning",
    "btn-outline-dark": type == "dark",
  };
  return props.outline ? classesOutline : classes;
};

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  typeClass: {
    type: String as PropType<ClassesProps["type"]>,
    required: false,
    default: "primary",
  },
  isKeydown: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
});

watchEffect(() => {
  if (props.isKeydown) {
    document.addEventListener("keydown", function (e) {
      if (e.key == "Enter") {
        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
          if (button.textContent?.toLowerCase() === "pesquisar") {
            button.click();
          }
        });
      }
    });
  }
});
</script>

<style scoped>
.btn {
  font-weight: bold;
  font-family: DINPro-Medium, Arial, sans-serif;
  text-transform: uppercase;
  /* O font-family usado abaixo é o utilizado no Piweb*/
  /* font-family: sans-serif, arial, helvetica; */
  margin-left: 10px;
}
</style>
