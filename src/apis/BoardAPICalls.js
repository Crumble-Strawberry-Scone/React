import { GET_BOARD } from "../modules/BoardModule";
import { NUM_BOARD } from "../modules/BoardModule";

// 모든 게시물 불러오기
export const callGetBoardAllAPI = () => {
    const requestURL = 'http://localhost:8080/board/getBoardAll';

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(response => response.json());

        console.log('response :>>>>>>>>>>>>>>>>', result);
        dispatch({ type: GET_BOARD, payload: result });
    };
};

// 게시판 insert
export const callWritingInsertAPI = ({ formData }) => {
    const requestURL = 'http://localhost:8080/board/writingGo';

    console.log("formData=========>" + formData);
    for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
    }
    console.log("formData======================");

    return fetch(requestURL, {
        method: 'POST',
        headers: {
            "Accept": "*/*"
        },
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Error board insert');
                throw new Error('Error board insert');
            }
        })
        .then(() => {
            window.alert('게시물이 업로드 되었습니다.');
            window.location="/board/notieE";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

// 게시판 update
export const callUpdateBoardAPI = ({ formData }) => {
    const requestURL = 'http://localhost:8080/board/updateBoard';

    console.log("formData=========>" + formData);
    for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
    }
    console.log("formData======================");

    return fetch(requestURL, {
        method: 'POST',
        headers: {
            "Accept": "*/*"
        },
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Error board update');
                throw new Error('Error board update');
            }
        })
        .then(() => {
            window.alert('게시물이 수정 되었습니다.');
            window.location="/board/notieE";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

// 게시판 delete
export const callDeleteBoardAPI = (boardNo) => {

    console.log("boardNo=========>" + boardNo);
    const requestURL = `http://localhost:8080/board/deleteBoard?boardNo=${boardNo}`;

    return fetch(requestURL, {
        method: 'POST',
        headers: {
            "Accept": "*/*"
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Error board delete');
                throw new Error('Error board delete');
            }
        })
        .then(() => {
            window.alert('게시물이 삭제 되었습니다.');
            window.location="/board/notieE";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

// 특정 게시물 불러오기
export const callFindBoardNumAPI = (boardNoAsInt) => {
    const boardNo = boardNoAsInt;
    const requestURL = `http://localhost:8080/board/getBoardNum?boardNo=${boardNo}`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(response => response.json());

        console.log('response :>>>>>>>>>>>>>>>>', result);
        dispatch({ type: NUM_BOARD, payload: result });
    };
};