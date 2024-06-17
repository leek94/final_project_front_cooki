<template>
    <div class="d-flex" style="justify-content: center;">

        <form>
        <div class="row m-5 p-5 " style=" width: 800px; ">
            <h3 style="font-weight: bold; text-align: center">회원가입</h3>
            <div class="">

                <!-- 일반유저/에디터 공통 항목 -->
                <div class="text-start bg-light p-5 my-5">
                    <h4 class="p-2 border-bottom border-dark border-3" style="font-weight: bold;">기본 정보</h4>
                    <div class="row my-3 px-3">
                        <label class=" m-1">아이디(이메일)</label>
                        <input class="p-2" placeholder="cooki123@naver.com" style="background-color: #dddddd;" readonly />
                    </div>
                
                    <div class="row my-3 px-3">
                        <label class="">이름</label>
                        <input class="p-2" placeholder="이름을 입력해주세요."/>
                    </div>
                
                    <div class="row my-3 px-3">
                        <label class="">휴대폰 번호</label>
                        <input class="p-2" placeholder="하이픈(-) 없이 숫자만 입력해주세요"/>
                    </div>
                
                    <div class="row my-3 px-3">
                        <label class="">닉네임</label>
                        <input class="p-2" placeholder="닉네임을 입력해주세요"/>
                    </div>
                
                    <div class="row my-3 px-3">
                        <label class="">비밀번호</label>
                        <input class="p-2" placeholder="비밀번호를 입력해주세요"/>
                    </div>
                
                    <div class="row my-3 px-3">
                        <label class="">비밀번호 확인</label>
                        <input class="p-2" placeholder="비밀번호를 한 번 더입력해주세요"/>
                    </div>
                </div>
            
                <!-- 에디터 추가 항목 -->
                <div class="text-start bg-light p-5 my-5">
                    <h4 class=" p-2 border-bottom border-dark border-3" style="font-weight: bold;">추가 정보</h4>
                    <div class="mx-2 my-3">
                        <input class="me-2" type="checkbox" id="switch" name="editor" value="yes" style="accent-color: #FFB996;" checked/>
                        <label for="switch">에디터로 가입하기</label>
                    </div>

                    <div class="row my-3">
                        <label class="">경력</label>
                        <div class="d-flex">
                            <input class="flex-grow-1 p-2" placeholder="경력을 입력해주세요"/>
                            <button class="p-2 ms-3" style="width: 50px;"> + </button>
                        </div>
                    </div>

                    <div class="row my-3">
                        <label class="">수상 내역</label>
                        <div class="d-flex">
                            <input class="flex-grow-1 p-2" placeholder="수상 이력을 입력해주세요"/>
                            <button class="p-2 ms-3" style="width: 50px;"> + </button>
                        </div>
                    </div>
                </div>

                <!-- 약관 동의 -->
                <div class="text-start bg-light p-5 my-5">
                    <h4 class="p-2 border-bottom border-dark border-3" style="font-weight: bold;">약관 동의</h4>
                    <div class="mx-2 my-3">
                        <input class="me-2 rounded" type="checkbox" id="switch" name="editor" value="yes" style="accent-color: #FFB996;" checked/>
                        <label for="switch"> [필수] 만 14세 이상입니다.</label>
                    </div>
                    <div class="mx-2 my-3">
                        <input class="me-2" type="checkbox" id="switch" name="editor" value="yes" style="accent-color: #FFB996;" checked/>
                        <label for="switch"> [필수] <RouterLink>이용약관</RouterLink> 확인</label>
                    </div>
                    <div class="mx-2 my-3">
                        <input class="me-2" type="checkbox" id="switch" name="editor" value="yes" style="accent-color: #FFB996;" checked/>
                        <label for="switch"> [필수] <RouterLink>개인정보처리방침</RouterLink> 확인</label>
                    </div>
                    <div class="mx-2 my-3">
                        <input class="me-2" type="checkbox" id="switch" name="editor" value="yes" style="accent-color: #FFB996;" checked/>
                        <label for="switch"> [선택] 광고성메세지 수신 동의</label>
                    </div>

                    <div class="bg-dark-subtle mx-2 my-3 p-3">
                        <h6>* 회원 탈퇴 시까지 회원으로서 자격이 유지됩니다.</h6>
                        <h6>* 광고성메세지 수신에 동의하지 않더라도, 이벤트 당첨 안내 등 원활환 서비스 이용과 관련된 메세지는 발송됩니다.</h6>
                    </div>
                </div>

                <div>
                    <button class="py-2 bg-dark text-white rounded w-100" style="font-weight: bold;">회원가입</button>
                </div>
            </div>    
        </div>
        </form>
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>