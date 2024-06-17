<template>
    <div class="" style="margin-left: auto; margin-right: auto;">

        <div class="d-flex m-5 p-5" style="min-width: 1000px;">
            <h3>회원가입</h3>
            <div class="">

                <!-- 일반유저/에디터 공통 항목 -->
                <div class="grow-1 border p-3">
                    <div class="row my-2">
                        <label class="text-start m-1">아이디(이메일)</label>
                        <input class="p-2" placeholder="cooki123@naver.com" style="background-color: #dddddd;" readonly />
                    </div>
                
                    <div class="row my-2">
                        <label class="text-start">이름</label>
                        <input class="p-2" placeholder="이름을 입력해주세요."/>
                    </div>
                
                    <div class="row my-2">
                        <label class="text-start">휴대폰 번호</label>
                        <input class="p-2" placeholder="하이픈(-) 없이 숫자만 입력해주세요"/>
                    </div>
                
                    <div class="row my-2">
                        <label class="text-start">닉네임</label>
                        <input class="p-2" placeholder="닉네임을 입력해주세요"/>
                    </div>
                
                    <div class="row my-2">
                        <label class="text-start">비밀번호</label>
                        <input class="p-2" placeholder="비밀번호를 입력해주세요"/>
                    </div>
                
                    <div class="row my-2">
                        <label class="text-start">비밀번호 확인</label>
                        <input class="p-2" placeholder="비밀번호를 한 번 더입력해주세요"/>
                    </div>
                </div>
            
                <!-- 에디터 추가 항목 -->
                <div class="grow-1 border p-3">
                   
    
                    <div class="text-start m-2">
                        <input class="me-2" type="checkbox" id="switch" name="editor" value="yes" style="accent-color: #FFB996;" checked/>
                        <label for="switch">에디터로 가입하기</label>
                    </div>

                    <div class="row my-2">
                        <label class="text-start">경력</label>
                        <input class="p-2" placeholder="경력을 입력해주세요"/>
                    </div>

                    <div class="row my-2">
                        <label class="text-start">수상 내역</label>
                        <input class="p-2" placeholder="수상 이력을 입력해주세요"/>
                    </div>

                </div>
            </div>    

               

            </div>
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>