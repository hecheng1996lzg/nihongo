import axios from 'axios';

export function getCourseList() {
  return axios.get(process.env.VUE_APP_BASE_API + '/courses');
}

export function getCoursesWords(map) {
  let ps = [];
  map.forEach((v, k) => {
    let p = new Promise((resolve) => {
      return axios.get(`${process.env.VUE_APP_BASE_API}/courses/${k}/words`).then((res) => {
        resolve(res.data);
      })
    });
    ps.push(p);
  });
  return Promise.all(ps);
}