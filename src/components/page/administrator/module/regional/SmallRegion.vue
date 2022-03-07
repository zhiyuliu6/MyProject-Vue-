<template>
        <div class="smallRegion">
                <div class="picture">
                        <h2 style="font-family: 新蒂小丸子体,serif;margin-left: 150px;line-height: 2">Image from the current area live</h2>
                        <el-carousel style="box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.26);width: 40%;height: 40%;">
                                <el-carousel-item v-for="item in currentPic" :key="item">
                                        <el-image
                                                :src="item"
                                                :fit="fit">
                                        </el-image>
                                </el-carousel-item>
                        </el-carousel>

                </div>

        </div>
</template>

<script>
export default {
        name: "SmallRegion",
        data() {
                return {
                        currentPic: ['http://localhost:8080/image/currentRegionImage/20210404-215938_t019fb6c06be0f8607b.jpg',
                                'http://localhost:8080/image/currentRegionImage/20210404-215952_t01dcfa259d43745cd7.jpg',
                                'http://localhost:8080/image/currentRegionImage/20210404-220003_t012343cca9644b30cb.jpg',
                                'http://localhost:8080/image/currentRegionImage/20210404-220141_t01a2bbc4f47c3ac58d.jpg'],
                        fit: 'fit'
                }
        }
}
</script>

<style scoped>
.smallRegion{
        width: 100%;
        height: 100%;
}
.picture {
        padding-left: 10px;
}
</style>