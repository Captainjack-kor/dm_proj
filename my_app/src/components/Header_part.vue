<template>
  <div class="header">
    <div style="display: flex; justify-content: space-between;">
      <div style="padding: 55px 0px 0px 50px;">
        Can find what you want
      </div>
      <div class="menu_btn" style="border-left: 3px solid black; width: 50px; padding: 55px;">
        <div style="padding-left: 12px; cursor: pointer;">
          =
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .header {
    width: 100%;
    height: 150px;
    position: fixed;
    font-size: 36px;
    font-family: Georgia, serif;
    border-bottom: 3px double black;
  }

  .menu_btn:hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
</style>
