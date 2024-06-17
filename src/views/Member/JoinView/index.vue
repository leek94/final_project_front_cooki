<template>
    <div class="d-flex" style="justify-content: center;">

        <form>
        <div class="row m-5 px-5 " style=" width: 700px; ">
            <h3 style="font-weight: bold; text-align: center">회원가입</h3>
            <div class="">

                <!-- 일반유저/에디터 공통 항목 -->
                <div class="text-start bg-light p-5 my-5">
                    <h4 class="p-2 border-bottom border-dark border-3" style="font-weight: bold;">기본 정보</h4>
                    <div class="row my-3 px-3">
                        <li class="green-point">아이디(이메일)</li>
                        <input class="p-2 border" placeholder="cooki123@naver.com"/>
                    </div>
                
                    <div class="row my-3 px-3">
                        <li class="green-point">이름</li>
                        <input class="p-2 border" placeholder="이름을 입력해주세요."/>
                    </div>
                
                    <div class="row my-3 px-3">
                        <li class="green-point">휴대폰 번호</li>
                        <input class="p-2 border" placeholder="하이픈(-) 없이 숫자만 입력해주세요"/>
                    </div>
                
                    <div class="row my-3 px-3">
                        <li class="green-point">닉네임</li>
                        <input class="p-2 border" placeholder="닉네임을 입력해주세요"/>
                    </div>
                
                    <div class="row my-3 px-3">
                        <li class="green-point">비밀번호</li>
                        <input class="p-2 border" placeholder="비밀번호를 입력해주세요"/>
                    </div>
                
                    <div class="row my-3 px-3">
                        <li class="green-point">비밀번호 확인</li>
                        <input class="p-2 border" placeholder="비밀번호를 한 번 더입력해주세요"/>
                    </div>
                </div>
            
                <!-- 에디터 추가 항목 -->
                <div class="text-start bg-light p-5 my-5">
                    <h4 class=" p-2 border-bottom border-dark border-3" style="font-weight: bold;">추가 정보</h4>
                    <div class="mx-2 my-3">
                        <input class="checkbox me-2" type="checkbox" id="switch" name="editor" value="yes" checked/>
                        <label for="switch">에디터로 가입하기</label>
                    </div>

                    <div class="row my-3 px-3">
                        <li class="green-point">경력</li>
                        <div class="d-flex">
                            <input class="flex-grow-1 p-2 border" placeholder="경력을 입력해주세요"/>
                            <button class="p-2 ms-3 border"> + </button>
                        </div>
                    </div>

                    <div class="row my-3 px-3">
                        <li class="green-point">수상 내역</li>
                        <div class="d-flex">
                            <input class="flex-grow-1 p-2 border" placeholder="수상 이력을 입력해주세요"/>
                            <button class="p-2 ms-3 border"> + </button>
                        </div>
                    </div>
                </div>

                <!-- 약관 동의 -->
                <div class="text-start bg-light p-5 my-5">
                    <h4 class="p-2 border-bottom border-dark border-3" style="font-weight: bold;">약관 동의</h4>
                    <div class="mx-2 my-3">
                        <input class="checkbox me-2 rounded" type="checkbox" id="switch" name="editor" value="yes" checked/>
                        <label for="switch"> [필수] 만 14세 이상입니다.</label>
                    </div>
                    <div class="mx-2 my-3">
                        <input class="checkbox me-2" type="checkbox" id="switch" name="editor" value="yes" checked/>
                        <label for="switch"> [필수] <RouterLink>이용약관</RouterLink> 확인</label>
                    </div>
                    <div class="mx-2 my-3">
                        <input class="checkbox me-2" type="checkbox" id="switch" name="editor" value="yes" checked/>
                        <label for="switch"> [필수] <RouterLink>개인정보처리방침</RouterLink> 확인</label>
                    </div>
                    <div class="mx-2 my-3">
                        <input class="checkbox me-2" type="checkbox" id="switch" name="editor" value="yes" checked/>
                        <label for="switch"> [선택] 광고성메세지 수신 동의</label>
                    </div>

                    <div class="mx-2 my-3 p-3" style="background-color: #D9EDBF;">
                        <li>회원 탈퇴 시까지 회원으로서 자격이 유지됩니다.</li>
                        <li>광고성메세지 수신에 동의하지 않더라도, 이벤트 당첨 안내 등 원활환 서비스 이용과 관련된 메세지는 발송됩니다.</li>
                    </div>
                </div>

                <div>
                    <button class="py-2 border rounded w-100">회원가입</button>
                </div>
            </div>    
        </div>
        </form>
    </div>
</template>

<script setup>
</script>

<style scoped>
.checkbox {
    accent-color: #D9EDBF;
}

button {
    width: 50px;
    background-color: white;
    font-weight: bold;
}

button:hover {
    background-color: #15a775;
    color: white;
}

.green-point::marker {
    color: #15a775;
}

.green-point {
    font-weight: bold;
}

h6::marker {
    color: black;
}

</style>