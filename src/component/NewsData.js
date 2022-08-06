import React, { useEffect, useState } from 'react';
import { getNews } from '../Service/getNews';
import moment from 'moment';
import alanBtn from '@alan-ai/alan-sdk-web';

export default function NewsData() {
    const alankey ='d0e5c0014bb7f529066aa13ed6b221e72e956eca572e1d8b807a3e2338fdd0dc/stage'
    const [newsData, setNewsData] = useState([])
    const [selectOption, setSelectOption] = useState('');
    const getAll = async () => {
        let data = await getNews(selectOption);
        setNewsData(data.data.articles)
    }
    const selectCategory = (event) => {
        setSelectOption(event.target.value)
    }

    useEffect(() => {
        alanBtn({
            key: alankey,
            onCommand: (commandData) => {
              setSelectOption(commandData.data)
            }
        });
      }, []);

    useEffect(() => {
        getAll()
    }, [selectOption])

    return (
        <div className='main'>
            <h1> Daily News </h1>
            <div className='select'>
                <label for="category">Choose a category:</label>

                <select name="category" id="category" className='select-box' onChange={selectCategory} value={selectOption}>
                    <option value="general">General</option>
                    <option value="business">Business</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                </select>
            </div>

            <div className='grid'>
                {newsData?.map((news) => {
                    return (
                        <div className='grid-child'>
                            <p className='news-title'>{news?.title}</p>
                            <img className='news-image' src={news?.urlToImage} />
                            <p className='news-description'>{news?.description}</p>
                            <p className='news-content'>{news?.content}</p>
                            <div className='space-between'>
                                <p className='news-author'> {news?.author ? news?.author : 'Source unknown'}</p>
                                <p className='news-date'> {moment(news?.publishedAt).format('LL')}</p>
                            </div>
                            <a href={news?.url} target="_blank">Click to Read More...</a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}