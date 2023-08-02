import OptionsRepository from "../repositories/Options.repository.js";
import Cache from './cache.js'

class CacheInit {
    optionsRepository = new OptionsRepository();

    // 1. 서버가 실행될때 DB에 option 데이터를 요청해 모두 서버 메모리에 캐싱, 사용자 빠른 응답처리 및 DB접근 최소화
    // 백틱안의 option은 forEach에 쓰인 option
    cacheinit = async () => {
        const options = await this.optionsRepository.getOptions();
        console.log("options:",options)
        options.forEach(option => {
            const success = Cache.set(`${option.optionId}`, option, 10000)
        if(!success){
            console.error(`${option.optionId} cache failed`)
        }
        })
    }
}

export default CacheInit;

// set<T>(
//     key: Key,
//     value: T,
//     ttl: number | string
// ): boolean;
// https://www.npmjs.com/package/node-cache


// import OptionsRepository from './repositories/options.repository.js';
// import myCache from './cache.js';
// class CacheInit {
//   optionsRepository = new OptionsRepository();
//   cacheinit = async () => {
//     const options = await this.optionsRepository.getoptions();
//     options.forEach(option => {
//       const success = myCache.set(`option_${option.id}`, option, 10000);
//       if (!success) {
//         console.error(`option_${option.id} cache failed`);
//       }
//     });
//   };
// }

// export default CacheInit;