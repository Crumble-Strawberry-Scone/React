import {APPLY_MARKET, GET_MARKETSTATEW} from '../modules/MarketModule';
import {GO_LOGIN} from "../modules/MemberModule";
import Swal from 'sweetalert2';

//영업점 신청 폼 전송
export const callApplyMarketAPI = ({ formData }) => {
    const requestURL = 'http://localhost:8080/market/applyMarket';

    console.log("formData=========>" + formData);
    for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
    }
    console.log("formData======================");


    return fetch(requestURL, {
        method: 'POST',
        headers: {
            "Accept": "*/*",
            //"Access-Control-Allow-Origin": "*"
        },
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Error apply market');
                throw new Error('Error apply market');
            }
        })
        .then(() => {
            window.alert('영업점 계정 신청이 완료되었습니다.');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

    //상태 W인 신청폼 조회
export const callGetMarketStateWAPI = () => {
        const requestURL = 'http://localhost:8080/market/getMarketStateW';

        return async (dispatch) => {
            const result = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).then(response => response.json());

            console.log('response :>>>>>>>>>>>>>>>>', result);
            dispatch({ type: GET_MARKETSTATEW, payload: result });
        }
    };

//영업점 등록 및 아이디/비번 생성
export const callInsertMarketAPI = ({ infoToPass }) => {
    const requestURL = 'http://localhost:8080/market/insertMarket';

    return fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoToPass),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Error inserting market');
                throw new Error('Error inserting market');
            }
        })
        .then(() => {
            window.alert('영업점 등록이 완료되었습니다.');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

// 영업점로그인
export const callLoginGOAPI = ({ loginInfo, rememberAccount }) => {
    const requestURL = 'http://localhost:8080/auth/login2';

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(loginInfo),
        }).then(response => response.json());

        console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
        if(result.status === 200){
            window.localStorage.setItem('accessToken', result.data.accessToken);

            // 체크박스가 체크되어 있다면 아이디를 로컬 스토리지에 저장
            if (rememberAccount) {
                window.localStorage.setItem('savedId', loginInfo.id);
            } else {
                // 체크박스가 체크되어 있지 않다면 아이디를 로컬 스토리지에서 제거
                window.localStorage.removeItem('savedId');
            }
            Swal.fire({
                icon: 'success',
                title: 'Login...',
                text: '로그인 되었습니다.',
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'error...',
                text: '아이디 또는 비밀번호가 올바르지 않습니다.',
            })
        }
        dispatch({ type: GO_LOGIN, payload: result });

    };
};