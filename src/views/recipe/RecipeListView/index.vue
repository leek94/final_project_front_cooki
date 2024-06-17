<template>
    <div class="container_box ss">
        
        <form>
            <div class="recipe-title"><h3>레시피</h3></div>
            <div class="search-box d-flex align-items-center justify-content-center ss mb-5">
                <!-- 선택하는 셀렉터 -->
                <select class="select-button ss">
                    <option value="all">전체</option>
                    <option value="title">제목만</option>
                    <option value="content">내용만</option>
                </select>
                <!-- 검색바 & 검색 버튼 & 카테고리 박스-->
                <div class="d-flex ss search-input-box">
                    <input class="search-input ss me-1" type="text" placeholder="어떤 레시피가 궁금하신가요?">
                    <button class="search-button align-items-center justify-content-center ss">검색</button>
                </div>
                
            </div>
            <!-- 카테고리 -->
            <div class="d-flex mb-5">
                    <button class="category-button">#한식</button>
                    <button class="category-button">#중식</button>
                    <button class="category-button">#일식</button>
                    <button class="category-button">#양식</button>
                    <button class="category-button">#디저트</button>
                    <button class="category-button">#베이커리</button>
            </div>
            <!-- 작성바 & 작성 버튼 -->
            <div class="top-box ss d-flex align-content-center align-content-center mb-5">
                <img src="/images/photos/il_samie_3.png">
                <p class="mt-2">
                    나만의 레시피를 올려주세요!
                    <br>
                    <span>나만의 요리법, 재밌는 플레이팅, 요리 꿀팁 등 다양한 이야기를 함께 나눠주세요!</span>
                </p>

                <div class="regist-recipe d-flex align-items-center justify-content-center">
                    <!-- 라우터로 변경 예정 -->
                    <div>작성하기</div>
                </div>
            </div>
            <!-- main 시작 -->
            <div class="main-box ss">
                <!-- 정렬 버튼 -->
                <div class="sorted-box d-flex ">
                    <ul class="sorted-part d-flex">
                        <li class="clicked-li me-4" :class="{ active: activeIndex === 0 }" @click="setActive(0)">최신순</li>
                        <li class="clicked-li me-4" :class="{ active: activeIndex === 1 }" @click="setActive(1)">조회순</li>
                        <li class="clicked-li me-4" :class="{ active: activeIndex === 2 }" @click="setActive(2)">좋아요순</li>
                    </ul>
                </div>
                <!-- 사진 -->
                <div class="main-box ss">
                    <ul class="main-img d-flex ss">
                        <!-- 레시피 카드 -->
                        <li class="img-li ss">
                            <div class="router-div">
                                <div class="image">
                                    <img src="/images/photos/140114575djmw.jpg">
                                    code1
                                </div>
                               
                                    <div class="info d-flex mt-3 ">
                                        <div class="name me-2">김진영</div>
                                        <div class="date border-left-solid">2024.06.09 16:43</div>
                                    </div>
                                    <div class="text text-start">
                                        <h4>맛있는 행복한 시간</h4>
                                        <div class="d-flex justify-content-end">
                                            <div class="me-2">좋아요</div>
                                            <div class="">히트카운트</div>
                                        </div>
                                        
                                    </div>
                                    
                                
                            </div>
                        </li>
                        <li class="img-li ss">
                            <div class="router-div">
                                <div class="image">
                                    <img src="/images/photos/140114575djmw.jpg">
                                    code1
                                </div>
                               
                                    <div class="info d-flex mt-3 ">
                                        <div class="name me-1">김진영</div>
                                        <div class="date border-left-solid">2024.06.09 16:43</div>
                                        
                                    </div>
                                    <div class="text text-start">
                                        <h4>맛있는 행복한 시간</h4>
                                    </div>
                                
                            </div>
                        </li>
                        <li class="img-li ss">
                            <div class="router-div">
                                <div class="image">
                                    <img src="/images/photos/140114575djmw.jpg">
                                    code1
                                </div>
                               
                                    <div class="info d-flex mt-3 ">
                                        <div class="name me-1">김진영</div>
                                        <div class="date border-left-solid">2024.06.09 16:43</div>
                                        
                                    </div>
                                    <div class="text text-start">
                                        <h4>맛있는 행복한 시간</h4>
                                    </div>
                                
                            </div>
                        </li>
                        <li class="img-li ss">
                            <div class="router-div">
                                <div class="image">
                                    <img src="/images/photos/140114575djmw.jpg">
                                    code1
                                </div>
                               
                                    <div class="info d-flex mt-3 ">
                                        <div class="name me-1">김진영</div>
                                        <div class="date border-left-solid">2024.06.09 16:43</div>
                                        
                                    </div>
                                    <div class="text text-start">
                                        <h4>맛있는 행복한 시간</h4>
                                    </div>
                                
                            </div>
                        </li>
                        <li class="img-li ss">
                            <div class="router-div">
                                <div class="image">
                                    <img src="/images/photos/140114575djmw.jpg">
                                    code1
                                </div>
                               
                                    <div class="info d-flex mt-3 ">
                                        <div class="name me-1">김진영</div>
                                        <div class="date border-left-solid">2024.06.09 16:43</div>
                                        
                                    </div>
                                    <div class="text text-start">
                                        <h4>맛있는 행복한 시간</h4>
                                    </div>
                                
                            </div>
                        </li>
                        <li class="img-li ss">
                            <div class="router-div">
                                <div class="image">
                                    <img src="/images/photos/140114575djmw.jpg">
                                    code1
                                </div>
                               
                                    <div class="info d-flex mt-3 ">
                                        <div class="name me-1">김진영</div>
                                        <div class="date border-left-solid">2024.06.09 16:43</div>
                                        
                                    </div>
                                    <div class="text text-start">
                                        <h4>맛있는 행복한 시간</h4>
                                    </div>
                                
                            </div>
                        </li>
                        <li class="img-li ss">
                            <div class="router-div">
                                <div class="image">
                                    <img src="/images/photos/140114575djmw.jpg">
                                    code1
                                </div>
                               
                                    <div class="info d-flex mt-3 ">
                                        <div class="name me-1">김진영</div>
                                        <div class="date border-left-solid">2024.06.09 16:43</div>
                                        
                                    </div>
                                    <div class="text text-start">
                                        <h4>맛있는 행복한 시간</h4>
                                    </div>
                                
                            </div>
                        </li>
                        <li class="img-li ss">
                            <div class="router-div">
                                <div class="image">
                                    <img src="/images/photos/140114575djmw.jpg">
                                    code1
                                </div>
                               
                                    <div class="info d-flex mt-3 ">
                                        <div class="name me-1">김진영</div>
                                        <div class="date border-left-solid">2024.06.09 16:43</div>
                                        
                                    </div>
                                    <div class="text text-start">
                                        <h4>맛있는 행복한 시간</h4>
                                    </div>
                                
                            </div>
                        </li>
                        <!-- 클래스 카드 -->
                        <li class="class-img-li ss">
                            <div class="router-div">
                                <div class="class-image">
                                    <img src="/images/photos/semi2.jpg">
                                    code1
                                </div>
                                <div class="text-start">
                                    <div class="class-text text-start">
                                        <h4>생선을 활용한 쿠킹 클래스</h4>
                                    </div>
                                    <div>
                                        <h6>모집강사 : 김진영</h6>
                                    </div>
                                    <div>
                                        <h6>모집인원 : 17/25</h6>
                                    </div>

                                    <div class="info d-flex mb-3">
                                        <div class="class-date border-left-solid me-3">강의날짜 : 2024.06.21</div>
                                        <div class="dday-box">D-5</div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <div class="class-label text-end">참여하기</div>
                                </div>
                                
                            </div>
                        </li>
                        <!-- 클래스 카드 끝 -->
                        
                    </ul>
                    <!-- 중간 이벤트바 -->
                    <div></div>
                </div>
            </div>

        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref(0);

const setActive = (index) => {
  activeIndex.value = index;
};
</script>

<style scoped>

.recipe-title{
    font-size: 3.75rem;
    font-weight: 800;
    text-align: start;
}

.category-button{
    margin-right: 0.5rem;
    padding: 0.625rem 1rem;
    border-radius: 21px;
    border: solid 1px #d4d4d4;
    background-color: #fff;
    margin: 0 10px;
}

/* .ss{
    border: solid 1px;
} */

.container_box{
    padding: 6.875rem 1.875rem 6.25rem;
    margin-bottom: 1.25rem;
    max-width: 110rem;
    min-width: 75rem;
    margin: 0 auto;
}

.search-box{
    width: 100%;
    margin-bottom: 4rem;
  
}

.select-button{
    flex: 1;
    width: 14rem;
    height: 5rem;
    border-radius: 46px;
    padding: 0 2.5rem;
    border: solid 3px #e5e5e5;
    
}

.search-input-box{
   flex: 10;
}

.search-input{
    flex: 18;
    width: calc(100%-24rem);
    height: 5rem;
    border-radius: 46px 0 0 46px;
    font-size: 1.25rem;
    font-weight: bold;
    border: none;
    padding: 0 2.5rem;
    background-color: #f3f3f3;
}

.search-button{
    flex: 3;
    width: 10rem;
    height: 5rem;
    border-radius: 0 46px 46px 0;
    background-color: #15a775;
    color: #fff;
    font-size: 1.25rem;
    font-weight: 500;
    border: none;
}

.top-box{
    position: relative;
    width: 100%;
    justify-content: space-between;
    padding: 1.799rem 2rem 1.513rem 13rem;
    text-align: left;
    background-color: #fbb9bf;
    border-radius: 0.625rem;
    color:#fff;
    
}

.regist-recipe{
    padding-left: 2.625rem;
    border-left: 1px solid #fff
}

.top-box > img {
    position: absolute;
    left:0;
    bottom: 0;
    height: 9.75rem;
    margin-left: 3rem;

}

.sorted-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 1.75rem;
}

.clicked-li{
    font-size: 0.75rem;
    color: #c4c4c4;
}

.sorted-box li::marker {
    color: #c4c4c4;
}

.sorted-box li{
    color: #c4c4c4;
}


.sorted-box li.active {
    color: #000;
}

.sorted-box li.active::marker{
    color: #000;
}

.main-box{
    width: 100%;
    height: auto;
}

.main-img{
    width: 100%;
    height: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
}

/* 레시피 카드 */
.img-li{
    width: calc(25% - 2rem);
    margin: 0 1rem 5rem;
}

.image{
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-top: 90%; /* 자식 요소의 세로 길이를 부모 요소의 너비에 맞춤 */
    border-radius: 20px;
}

.image > img{
    position: absolute;
    width: 100%;
    height: auto;
    top: 50%;
    left: 50%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-out;
}

.name{
    color: #c4c4c4;
    font-size: 0.75rem;
}

.date{
    color: #c4c4c4;
    font-size: 0.75rem;
    border-left: 1px solid black;
    border-color: #c4c4c4;
    padding-left: 0.5rem;
}

.text{
    padding: 1.25rem 0 2rem;
}
/* 레시피 카드 끝 */

/* 클래스 카드 시작 */
.class-img-li{
    width: calc(25% - 2rem);
    margin: 0 1rem 5rem;
}

.class-image{
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-top: 90%; /* 자식 요소의 세로 길이를 부모 요소의 너비에 맞춤 */
    border-radius: 20px;
}

.class-image > img{
    position: absolute;
    width: 100%;
    height: auto;
    top: 50%;
    left: 50%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-out;
}

.class-name{
    color: #c4c4c4;
    font-size: 0.75rem;
}

.class-date{
   
    
}

.class-text{
    padding: 1.25rem 0 0.5rem;
}

.dday-box{
    color:red;
}

.class-label{
    display: inline-block;
    margin-bottom: 0.625rem;
    padding: 0.7rem 1rem;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 5px;
    background-color: #0bab6d;
}
/* 클래스 카드 끝 */


</style>