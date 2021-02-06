import HikeController from './HikeController.js';

const hikeController = new HikeController("hikeList");

window.onload = () => {hikeController.showHikeList()};
