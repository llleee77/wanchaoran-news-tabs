/**
 * tabs.js —— 可复用的选项卡组件
 *
 * 命名规则：所有 JS 变量、函数以 wcr_ 开头（姓名"万超然"拼音首字母）
 * 实现要点：
 *   1. 使用 addEventListener 事件监听实现点击切换
 *   2. 点击时先清除所有选项卡的选中状态，再设置当前元素的选中状态
 *   3. 通过 data-panel 属性与面板 id 对应，组件与具体内容解耦，可复用
 *
 * 用法：wcrTabs.init('#容器id');
 *       页面中可以存在多个选项卡容器，互不影响。
 */
var wcrTabs = (function () {
  'use strict';

  /** 为单个选项卡容器绑定事件 */
  function wcrBindContainer(wcrRoot) {
    var wcrTabItems = wcrRoot.querySelectorAll('.wcr_tab-item');
    var wcrPanels = wcrRoot.querySelectorAll('.wcr_tab-panel');

    wcrTabItems.forEach(function (wcrItem) {
      // 事件监听：点击选项卡时触发切换
      wcrItem.addEventListener('click', function () {
        // 第一步：清除所有选项卡的选中状态
        wcrTabItems.forEach(function (wcrTab) {
          wcrTab.classList.remove('wcr_active');
        });

        // 第二步：设置当前元素的选中状态
        wcrItem.classList.add('wcr_active');

        // 第三步：按 data-panel 找到对应面板，切换显示
        var wcrTargetId = wcrItem.getAttribute('data-panel');
        wcrPanels.forEach(function (wcrPanel) {
          if (wcrPanel.id === wcrTargetId) {
            wcrPanel.classList.add('wcr_show');
          } else {
            wcrPanel.classList.remove('wcr_show');
          }
        });
      });
    });
  }

  /** 初始化：可传选择器字符串或 DOM 元素；不传则初始化所有 .wcr_news-box */
  function wcrInit(wcrSelector) {
    var wcrRoots;
    if (typeof wcrSelector === 'string') {
      wcrRoots = document.querySelectorAll(wcrSelector);
    } else if (wcrSelector) {
      wcrRoots = [wcrSelector];
    } else {
      wcrRoots = document.querySelectorAll('.wcr_news-box');
    }
    wcrRoots.forEach(wcrBindContainer);
  }

  // 对外只暴露 init 方法
  return { init: wcrInit };
})();
