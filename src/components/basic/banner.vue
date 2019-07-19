<template>
    <div class="banner">
        <header class="top-header">
            <slot name="logo"></slot>   
            <span class="title">{{title}}</span>
            <slot name="topNav"></slot>
            <slot name="user"></slot>
        </header>       
    </div>
</template>

<script>
    export default {
        name:"banner",
        props:['title']
    };
</script>

