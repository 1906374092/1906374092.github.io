(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{321:function(e,s,n){"use strict";n.r(s);var a=n(1),t=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,s=e.$createElement,n=e._self._c||s;return n("div",{staticClass:"content"},[n("p",[e._v("最近项目有个需求，在项目里集成在线客服功能，但是不能用socket通信，而是用websocket，这样就没办法集成环信或者网易云信这样的IM框架。所以为了满足需求，找到了SocketRocket和JSQMessagesViewController这两个框架。Github 上很著名的framework。到底怎么样，用了才知道。")]),e._v(" "),n("p",[n("strong",[e._v("1.用cocoapods安装框架")])]),e._v(" "),n("p",[e._v("一开始在Github 上下载了这两个框架，直接拖拽到项目里，JSQMessagesViewController可以用，但是SocketRocket会报错，尝试多次后果断放弃这种集成方式，改用cocoapods，毕竟配置项目还是很繁琐的，cocoapods会帮我们配置好项目。\n1.编写Podfile")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("platform:ios,'8.0'\ntarget 'ChatByRS' do\npod 'SocketRocket'\npod 'JSQMessagesViewController'\nend\n\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br")])]),n("p",[e._v("执行po install --verbose --no-repo-update,安装成功后打开工作空间文件。")]),e._v(" "),n("p",[n("strong",[e._v("2聊天界面的实现")])]),e._v(" "),n("p",[e._v("对于iOS来说，无论用xib还是纯代码的方式，实现一个聊天界面都是相对复杂的事情。这其中要考虑到很多头疼的问题，例如UICollectionViewCell和textview的高度自适应，数据绑定问题等等。有了JSQMessagesViewController这个框架，这些问题统统已经被解决掉了。要做的就是新建一个ViewController继承JSQMessagesViewController,然后实现几个delegate函数，话不多说，上代码。")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('#pragma mark - 消息代理\n-(void)didPressSendButton:(UIButton *)button withMessageText:(NSString *)text senderId:(NSString *)senderId senderDisplayName:(NSString *)senderDisplayName date:(NSDate *)date{\n    if (self.webSocket) {\n        [self.webSocket send:text];\n    }\n\n    JSQMessage *message = [[JSQMessage alloc] initWithSenderId:senderId\n                                             senderDisplayName:senderDisplayName\n                                                          date:date\n                                                          text:text];\n    \n    [self.model.messages addObject:message];\n    \n    [self finishSendingMessageAnimated:YES];\n\n}\n-(NSString *)senderId{\n    return @"memId";\n}\n-(NSString *)senderDisplayName{\n    return @"用户名";\n}\n// 根据index返回需要加载的message对象\n- (id<JSQMessageData>)collectionView:(JSQMessagesCollectionView *)collectionView messageDataForItemAtIndexPath:(NSIndexPath *)indexPath\n{\n    return [self.model.messages objectAtIndex:indexPath.item];\n}\n\n// 删除消息\n- (void)collectionView:(JSQMessagesCollectionView *)collectionView didDeleteMessageAtIndexPath:(NSIndexPath *)indexPath\n{\n    [self.model.messages removeObjectAtIndex:indexPath.item];\n}\n- (id<JSQMessageBubbleImageDataSource>)collectionView:(JSQMessagesCollectionView *)collectionView messageBubbleImageDataForItemAtIndexPath:(NSIndexPath *)indexPath\n{\n    /**\n     *  You may return nil here if you do not want bubbles.\n     *  In this case, you should set the background color of your collection view cell\'s textView.\n     *\n     *  Otherwise, return your previously created bubble image data objects.\n     */\n    \n    JSQMessage *message = [self.model.messages objectAtIndex:indexPath.item];\n    \n    if ([message.senderId isEqualToString:self.senderId]) {\n        return self.model.outgoingBubbleImageData;\n    }\n    \n    return self.model.incomingBubbleImageData;\n}\n\n// 头像\n- (id<JSQMessageAvatarImageDataSource>)collectionView:(JSQMessagesCollectionView *)collectionView avatarImageDataForItemAtIndexPath:(NSIndexPath *)indexPath\n{\n    /**\n     *  Return `nil` here if you do not want avatars.\n     *  If you do return `nil`, be sure to do the following in `viewDidLoad`:\n     *\n     *  self.collectionView.collectionViewLayout.incomingAvatarViewSize = CGSizeZero;\n     *  self.collectionView.collectionViewLayout.outgoingAvatarViewSize = CGSizeZero;\n     *\n     *  It is possible to have only outgoing avatars or only incoming avatars, too.\n     */\n    \n    /**\n     *  Return your previously created avatar image data objects.\n     *\n     *  Note: these the avatars will be sized according to these values:\n     *\n     *  self.collectionView.collectionViewLayout.incomingAvatarViewSize\n     *  self.collectionView.collectionViewLayout.outgoingAvatarViewSize\n     *\n     *  Override the defaults in `viewDidLoad`\n     */\n    JSQMessage *message = [self.model.messages objectAtIndex:indexPath.item];\n    \n    return [self.model.avatars objectForKey:message.senderId];\n}\n\n// 时间UI\n- (NSAttributedString *)collectionView:(JSQMessagesCollectionView *)collectionView attributedTextForCellTopLabelAtIndexPath:(NSIndexPath *)indexPath\n{\n    /**\n     *  This logic should be consistent with what you return from `heightForCellTopLabelAtIndexPath:`\n     *  The other label text delegate methods should follow a similar pattern.\n     *\n     *  Show a timestamp for every 3rd message\n     */\n    if (indexPath.item % 5 == 0) {\n        JSQMessage *message = [self.model.messages objectAtIndex:indexPath.item];\n        return [[JSQMessagesTimestampFormatter sharedFormatter] attributedTimestampForDate:message.date];\n    }\n    \n    return nil;\n}\n\n// 除本人以外显示bubble cell上面的名字\n- (NSAttributedString *)collectionView:(JSQMessagesCollectionView *)collectionView attributedTextForMessageBubbleTopLabelAtIndexPath:(NSIndexPath *)indexPath\n{\n    JSQMessage *message = [self.model.messages objectAtIndex:indexPath.item];\n    \n    /**\n     *  iOS7-style sender name labels\n     */\n    if ([message.senderId isEqualToString:self.senderId]) {\n        return nil;\n    }\n    \n    if (indexPath.item - 1 > 0) {\n        JSQMessage *previousMessage = [self.model.messages objectAtIndex:indexPath.item - 1];\n        if ([[previousMessage senderId] isEqualToString:message.senderId]) {\n            return nil;\n        }\n    }\n    \n    /**\n     *  Don\'t specify attributes to use the defaults.\n     */\n//    return [[NSAttributedString alloc] initWithString:message.senderDisplayName];\n    return nil;\n}\n\n// 气泡cell底部文字\n- (NSAttributedString *)collectionView:(JSQMessagesCollectionView *)collectionView attributedTextForCellBottomLabelAtIndexPath:(NSIndexPath *)indexPath\n{\n    return nil;\n}\n\n#pragma mark - UICollectionView DataSource\n\n- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section\n{\n    return [self.model.messages count];\n}\n-(UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath{\n    JSQMessagesCollectionViewCell *cell = (JSQMessagesCollectionViewCell *)[super collectionView:collectionView cellForItemAtIndexPath:indexPath];\n\n    JSQMessage *msg = [self.model.messages objectAtIndex:indexPath.item];\n    \n    if (!msg.isMediaMessage) {\n        \n        if ([msg.senderId isEqualToString:self.senderId]) {\n            cell.textView.textColor = [UIColor blackColor];\n        }\n        else {\n            cell.textView.textColor = [UIColor blackColor];\n        }\n        \n        cell.textView.linkTextAttributes = @{ NSForegroundColorAttributeName : cell.textView.textColor,\n                                              NSUnderlineStyleAttributeName : @(NSUnderlineStyleSingle | NSUnderlinePatternSolid) };\n    }\n    return cell;\n\n}\n// cell气泡上面的时间高度，出来就给默认20  3个给一个\n- (CGFloat)collectionView:(JSQMessagesCollectionView *)collectionView\n                   layout:(JSQMessagesCollectionViewFlowLayout *)collectionViewLayout heightForCellTopLabelAtIndexPath:(NSIndexPath *)indexPath\n{\n    /**\n     *  Each label in a cell has a `height` delegate method that corresponds to its text dataSource method\n     */\n    \n    /**\n     *  This logic should be consistent with what you return from `attributedTextForCellTopLabelAtIndexPath:`\n     *  The other label height delegate methods should follow similarly\n     *\n     *  Show a timestamp for every 3rd message\n     */\n    if (indexPath.item % 5 == 0) {\n        return kJSQMessagesCollectionViewCellLabelHeightDefault;\n    }\n    \n    return 0.0f;\n}\n\n// cell气泡上面的人名字高度  发送人不需要  和上一个重名也不需要  不然默认给20\n- (CGFloat)collectionView:(JSQMessagesCollectionView *)collectionView\n                   layout:(JSQMessagesCollectionViewFlowLayout *)collectionViewLayout heightForMessageBubbleTopLabelAtIndexPath:(NSIndexPath *)indexPath\n{\n    /**\n     *  iOS7-style sender name labels\n     */\n    JSQMessage *currentMessage = [self.model.messages objectAtIndex:indexPath.item];\n    if ([[currentMessage senderId] isEqualToString:self.senderId]) {\n        return 0.0f;\n    }\n    \n    if (indexPath.item - 1 > 0) {\n        JSQMessage *previousMessage = [self.model.messages objectAtIndex:indexPath.item - 1];\n        if ([[previousMessage senderId] isEqualToString:[currentMessage senderId]]) {\n            return 0.0f;\n        }\n    }\n    \n    return kJSQMessagesCollectionViewCellLabelHeightDefault;\n}\n\n// cell底部展示文案的高度\n- (CGFloat)collectionView:(JSQMessagesCollectionView *)collectionView\n                   layout:(JSQMessagesCollectionViewFlowLayout *)collectionViewLayout heightForCellBottomLabelAtIndexPath:(NSIndexPath *)indexPath\n{\n    return 0.0f;\n}\n// 粘贴的是Media的话就自己配置返回NO，YES就是发送文字\n- (BOOL)composerTextView:(JSQMessagesComposerTextView *)textView shouldPasteWithSender:(id)sender\n{\n    if ([UIPasteboard generalPasteboard].image) {\n        // If there\'s an image in the pasteboard, construct a media item with that image and `send` it.\n        JSQPhotoMediaItem *item = [[JSQPhotoMediaItem alloc] initWithImage:[UIPasteboard generalPasteboard].image];\n        JSQMessage *message = [[JSQMessage alloc] initWithSenderId:self.senderId\n                                                 senderDisplayName:self.senderDisplayName\n                                                              date:[NSDate date]\n                                                             media:item];\n        [self.model.messages addObject:message];\n        [self finishSendingMessage];\n        return NO;\n    }\n    return YES;\n}\n\n#pragma mark - JSQMessagesViewAccessoryDelegate methods\n\n// 调用这段代码 shouldShowAccessoryButtonForMessage\n// cell左右侧出现的标签按钮事件回调\n- (void)messageView:(JSQMessagesCollectionView *)view didTapAccessoryButtonAtIndexPath:(NSIndexPath *)path\n{\n    NSLog(@"Tapped accessory button!");\n}\n\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br"),n("span",{staticClass:"line-number"},[e._v("18")]),n("br"),n("span",{staticClass:"line-number"},[e._v("19")]),n("br"),n("span",{staticClass:"line-number"},[e._v("20")]),n("br"),n("span",{staticClass:"line-number"},[e._v("21")]),n("br"),n("span",{staticClass:"line-number"},[e._v("22")]),n("br"),n("span",{staticClass:"line-number"},[e._v("23")]),n("br"),n("span",{staticClass:"line-number"},[e._v("24")]),n("br"),n("span",{staticClass:"line-number"},[e._v("25")]),n("br"),n("span",{staticClass:"line-number"},[e._v("26")]),n("br"),n("span",{staticClass:"line-number"},[e._v("27")]),n("br"),n("span",{staticClass:"line-number"},[e._v("28")]),n("br"),n("span",{staticClass:"line-number"},[e._v("29")]),n("br"),n("span",{staticClass:"line-number"},[e._v("30")]),n("br"),n("span",{staticClass:"line-number"},[e._v("31")]),n("br"),n("span",{staticClass:"line-number"},[e._v("32")]),n("br"),n("span",{staticClass:"line-number"},[e._v("33")]),n("br"),n("span",{staticClass:"line-number"},[e._v("34")]),n("br"),n("span",{staticClass:"line-number"},[e._v("35")]),n("br"),n("span",{staticClass:"line-number"},[e._v("36")]),n("br"),n("span",{staticClass:"line-number"},[e._v("37")]),n("br"),n("span",{staticClass:"line-number"},[e._v("38")]),n("br"),n("span",{staticClass:"line-number"},[e._v("39")]),n("br"),n("span",{staticClass:"line-number"},[e._v("40")]),n("br"),n("span",{staticClass:"line-number"},[e._v("41")]),n("br"),n("span",{staticClass:"line-number"},[e._v("42")]),n("br"),n("span",{staticClass:"line-number"},[e._v("43")]),n("br"),n("span",{staticClass:"line-number"},[e._v("44")]),n("br"),n("span",{staticClass:"line-number"},[e._v("45")]),n("br"),n("span",{staticClass:"line-number"},[e._v("46")]),n("br"),n("span",{staticClass:"line-number"},[e._v("47")]),n("br"),n("span",{staticClass:"line-number"},[e._v("48")]),n("br"),n("span",{staticClass:"line-number"},[e._v("49")]),n("br"),n("span",{staticClass:"line-number"},[e._v("50")]),n("br"),n("span",{staticClass:"line-number"},[e._v("51")]),n("br"),n("span",{staticClass:"line-number"},[e._v("52")]),n("br"),n("span",{staticClass:"line-number"},[e._v("53")]),n("br"),n("span",{staticClass:"line-number"},[e._v("54")]),n("br"),n("span",{staticClass:"line-number"},[e._v("55")]),n("br"),n("span",{staticClass:"line-number"},[e._v("56")]),n("br"),n("span",{staticClass:"line-number"},[e._v("57")]),n("br"),n("span",{staticClass:"line-number"},[e._v("58")]),n("br"),n("span",{staticClass:"line-number"},[e._v("59")]),n("br"),n("span",{staticClass:"line-number"},[e._v("60")]),n("br"),n("span",{staticClass:"line-number"},[e._v("61")]),n("br"),n("span",{staticClass:"line-number"},[e._v("62")]),n("br"),n("span",{staticClass:"line-number"},[e._v("63")]),n("br"),n("span",{staticClass:"line-number"},[e._v("64")]),n("br"),n("span",{staticClass:"line-number"},[e._v("65")]),n("br"),n("span",{staticClass:"line-number"},[e._v("66")]),n("br"),n("span",{staticClass:"line-number"},[e._v("67")]),n("br"),n("span",{staticClass:"line-number"},[e._v("68")]),n("br"),n("span",{staticClass:"line-number"},[e._v("69")]),n("br"),n("span",{staticClass:"line-number"},[e._v("70")]),n("br"),n("span",{staticClass:"line-number"},[e._v("71")]),n("br"),n("span",{staticClass:"line-number"},[e._v("72")]),n("br"),n("span",{staticClass:"line-number"},[e._v("73")]),n("br"),n("span",{staticClass:"line-number"},[e._v("74")]),n("br"),n("span",{staticClass:"line-number"},[e._v("75")]),n("br"),n("span",{staticClass:"line-number"},[e._v("76")]),n("br"),n("span",{staticClass:"line-number"},[e._v("77")]),n("br"),n("span",{staticClass:"line-number"},[e._v("78")]),n("br"),n("span",{staticClass:"line-number"},[e._v("79")]),n("br"),n("span",{staticClass:"line-number"},[e._v("80")]),n("br"),n("span",{staticClass:"line-number"},[e._v("81")]),n("br"),n("span",{staticClass:"line-number"},[e._v("82")]),n("br"),n("span",{staticClass:"line-number"},[e._v("83")]),n("br"),n("span",{staticClass:"line-number"},[e._v("84")]),n("br"),n("span",{staticClass:"line-number"},[e._v("85")]),n("br"),n("span",{staticClass:"line-number"},[e._v("86")]),n("br"),n("span",{staticClass:"line-number"},[e._v("87")]),n("br"),n("span",{staticClass:"line-number"},[e._v("88")]),n("br"),n("span",{staticClass:"line-number"},[e._v("89")]),n("br"),n("span",{staticClass:"line-number"},[e._v("90")]),n("br"),n("span",{staticClass:"line-number"},[e._v("91")]),n("br"),n("span",{staticClass:"line-number"},[e._v("92")]),n("br"),n("span",{staticClass:"line-number"},[e._v("93")]),n("br"),n("span",{staticClass:"line-number"},[e._v("94")]),n("br"),n("span",{staticClass:"line-number"},[e._v("95")]),n("br"),n("span",{staticClass:"line-number"},[e._v("96")]),n("br"),n("span",{staticClass:"line-number"},[e._v("97")]),n("br"),n("span",{staticClass:"line-number"},[e._v("98")]),n("br"),n("span",{staticClass:"line-number"},[e._v("99")]),n("br"),n("span",{staticClass:"line-number"},[e._v("100")]),n("br"),n("span",{staticClass:"line-number"},[e._v("101")]),n("br"),n("span",{staticClass:"line-number"},[e._v("102")]),n("br"),n("span",{staticClass:"line-number"},[e._v("103")]),n("br"),n("span",{staticClass:"line-number"},[e._v("104")]),n("br"),n("span",{staticClass:"line-number"},[e._v("105")]),n("br"),n("span",{staticClass:"line-number"},[e._v("106")]),n("br"),n("span",{staticClass:"line-number"},[e._v("107")]),n("br"),n("span",{staticClass:"line-number"},[e._v("108")]),n("br"),n("span",{staticClass:"line-number"},[e._v("109")]),n("br"),n("span",{staticClass:"line-number"},[e._v("110")]),n("br"),n("span",{staticClass:"line-number"},[e._v("111")]),n("br"),n("span",{staticClass:"line-number"},[e._v("112")]),n("br"),n("span",{staticClass:"line-number"},[e._v("113")]),n("br"),n("span",{staticClass:"line-number"},[e._v("114")]),n("br"),n("span",{staticClass:"line-number"},[e._v("115")]),n("br"),n("span",{staticClass:"line-number"},[e._v("116")]),n("br"),n("span",{staticClass:"line-number"},[e._v("117")]),n("br"),n("span",{staticClass:"line-number"},[e._v("118")]),n("br"),n("span",{staticClass:"line-number"},[e._v("119")]),n("br"),n("span",{staticClass:"line-number"},[e._v("120")]),n("br"),n("span",{staticClass:"line-number"},[e._v("121")]),n("br"),n("span",{staticClass:"line-number"},[e._v("122")]),n("br"),n("span",{staticClass:"line-number"},[e._v("123")]),n("br"),n("span",{staticClass:"line-number"},[e._v("124")]),n("br"),n("span",{staticClass:"line-number"},[e._v("125")]),n("br"),n("span",{staticClass:"line-number"},[e._v("126")]),n("br"),n("span",{staticClass:"line-number"},[e._v("127")]),n("br"),n("span",{staticClass:"line-number"},[e._v("128")]),n("br"),n("span",{staticClass:"line-number"},[e._v("129")]),n("br"),n("span",{staticClass:"line-number"},[e._v("130")]),n("br"),n("span",{staticClass:"line-number"},[e._v("131")]),n("br"),n("span",{staticClass:"line-number"},[e._v("132")]),n("br"),n("span",{staticClass:"line-number"},[e._v("133")]),n("br"),n("span",{staticClass:"line-number"},[e._v("134")]),n("br"),n("span",{staticClass:"line-number"},[e._v("135")]),n("br"),n("span",{staticClass:"line-number"},[e._v("136")]),n("br"),n("span",{staticClass:"line-number"},[e._v("137")]),n("br"),n("span",{staticClass:"line-number"},[e._v("138")]),n("br"),n("span",{staticClass:"line-number"},[e._v("139")]),n("br"),n("span",{staticClass:"line-number"},[e._v("140")]),n("br"),n("span",{staticClass:"line-number"},[e._v("141")]),n("br"),n("span",{staticClass:"line-number"},[e._v("142")]),n("br"),n("span",{staticClass:"line-number"},[e._v("143")]),n("br"),n("span",{staticClass:"line-number"},[e._v("144")]),n("br"),n("span",{staticClass:"line-number"},[e._v("145")]),n("br"),n("span",{staticClass:"line-number"},[e._v("146")]),n("br"),n("span",{staticClass:"line-number"},[e._v("147")]),n("br"),n("span",{staticClass:"line-number"},[e._v("148")]),n("br"),n("span",{staticClass:"line-number"},[e._v("149")]),n("br"),n("span",{staticClass:"line-number"},[e._v("150")]),n("br"),n("span",{staticClass:"line-number"},[e._v("151")]),n("br"),n("span",{staticClass:"line-number"},[e._v("152")]),n("br"),n("span",{staticClass:"line-number"},[e._v("153")]),n("br"),n("span",{staticClass:"line-number"},[e._v("154")]),n("br"),n("span",{staticClass:"line-number"},[e._v("155")]),n("br"),n("span",{staticClass:"line-number"},[e._v("156")]),n("br"),n("span",{staticClass:"line-number"},[e._v("157")]),n("br"),n("span",{staticClass:"line-number"},[e._v("158")]),n("br"),n("span",{staticClass:"line-number"},[e._v("159")]),n("br"),n("span",{staticClass:"line-number"},[e._v("160")]),n("br"),n("span",{staticClass:"line-number"},[e._v("161")]),n("br"),n("span",{staticClass:"line-number"},[e._v("162")]),n("br"),n("span",{staticClass:"line-number"},[e._v("163")]),n("br"),n("span",{staticClass:"line-number"},[e._v("164")]),n("br"),n("span",{staticClass:"line-number"},[e._v("165")]),n("br"),n("span",{staticClass:"line-number"},[e._v("166")]),n("br"),n("span",{staticClass:"line-number"},[e._v("167")]),n("br"),n("span",{staticClass:"line-number"},[e._v("168")]),n("br"),n("span",{staticClass:"line-number"},[e._v("169")]),n("br"),n("span",{staticClass:"line-number"},[e._v("170")]),n("br"),n("span",{staticClass:"line-number"},[e._v("171")]),n("br"),n("span",{staticClass:"line-number"},[e._v("172")]),n("br"),n("span",{staticClass:"line-number"},[e._v("173")]),n("br"),n("span",{staticClass:"line-number"},[e._v("174")]),n("br"),n("span",{staticClass:"line-number"},[e._v("175")]),n("br"),n("span",{staticClass:"line-number"},[e._v("176")]),n("br"),n("span",{staticClass:"line-number"},[e._v("177")]),n("br"),n("span",{staticClass:"line-number"},[e._v("178")]),n("br"),n("span",{staticClass:"line-number"},[e._v("179")]),n("br"),n("span",{staticClass:"line-number"},[e._v("180")]),n("br"),n("span",{staticClass:"line-number"},[e._v("181")]),n("br"),n("span",{staticClass:"line-number"},[e._v("182")]),n("br"),n("span",{staticClass:"line-number"},[e._v("183")]),n("br"),n("span",{staticClass:"line-number"},[e._v("184")]),n("br"),n("span",{staticClass:"line-number"},[e._v("185")]),n("br"),n("span",{staticClass:"line-number"},[e._v("186")]),n("br"),n("span",{staticClass:"line-number"},[e._v("187")]),n("br"),n("span",{staticClass:"line-number"},[e._v("188")]),n("br"),n("span",{staticClass:"line-number"},[e._v("189")]),n("br"),n("span",{staticClass:"line-number"},[e._v("190")]),n("br"),n("span",{staticClass:"line-number"},[e._v("191")]),n("br"),n("span",{staticClass:"line-number"},[e._v("192")]),n("br"),n("span",{staticClass:"line-number"},[e._v("193")]),n("br"),n("span",{staticClass:"line-number"},[e._v("194")]),n("br"),n("span",{staticClass:"line-number"},[e._v("195")]),n("br"),n("span",{staticClass:"line-number"},[e._v("196")]),n("br"),n("span",{staticClass:"line-number"},[e._v("197")]),n("br"),n("span",{staticClass:"line-number"},[e._v("198")]),n("br"),n("span",{staticClass:"line-number"},[e._v("199")]),n("br"),n("span",{staticClass:"line-number"},[e._v("200")]),n("br"),n("span",{staticClass:"line-number"},[e._v("201")]),n("br"),n("span",{staticClass:"line-number"},[e._v("202")]),n("br"),n("span",{staticClass:"line-number"},[e._v("203")]),n("br"),n("span",{staticClass:"line-number"},[e._v("204")]),n("br"),n("span",{staticClass:"line-number"},[e._v("205")]),n("br"),n("span",{staticClass:"line-number"},[e._v("206")]),n("br"),n("span",{staticClass:"line-number"},[e._v("207")]),n("br"),n("span",{staticClass:"line-number"},[e._v("208")]),n("br"),n("span",{staticClass:"line-number"},[e._v("209")]),n("br"),n("span",{staticClass:"line-number"},[e._v("210")]),n("br"),n("span",{staticClass:"line-number"},[e._v("211")]),n("br"),n("span",{staticClass:"line-number"},[e._v("212")]),n("br"),n("span",{staticClass:"line-number"},[e._v("213")]),n("br"),n("span",{staticClass:"line-number"},[e._v("214")]),n("br"),n("span",{staticClass:"line-number"},[e._v("215")]),n("br"),n("span",{staticClass:"line-number"},[e._v("216")]),n("br"),n("span",{staticClass:"line-number"},[e._v("217")]),n("br"),n("span",{staticClass:"line-number"},[e._v("218")]),n("br"),n("span",{staticClass:"line-number"},[e._v("219")]),n("br"),n("span",{staticClass:"line-number"},[e._v("220")]),n("br"),n("span",{staticClass:"line-number"},[e._v("221")]),n("br"),n("span",{staticClass:"line-number"},[e._v("222")]),n("br"),n("span",{staticClass:"line-number"},[e._v("223")]),n("br"),n("span",{staticClass:"line-number"},[e._v("224")]),n("br"),n("span",{staticClass:"line-number"},[e._v("225")]),n("br"),n("span",{staticClass:"line-number"},[e._v("226")]),n("br"),n("span",{staticClass:"line-number"},[e._v("227")]),n("br"),n("span",{staticClass:"line-number"},[e._v("228")]),n("br"),n("span",{staticClass:"line-number"},[e._v("229")]),n("br")])]),n("p",[e._v("这样聊天界面基本实现了，但是还没有数据绑定，所以聊天的效果看不到。\n下面就加入websocket，实现数据绑定。")]),e._v(" "),n("p",[n("strong",[e._v("3.websocket通信及数据绑定")])]),e._v(" "),n("p",[e._v("实现SRWebSocketDelegate。")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('- (void)Reconnect{\n    self.webSocket.delegate = nil;\n    [self.webSocket close];\n    \n    self.webSocket = [[SRWebSocket alloc] initWithURLRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"ws://echo.websocket.org"]]];\n    self.webSocket.delegate = self;\n    \n//    self.title = @"Opening Connection...";\n    \n    [self.webSocket open];\n}\n\n- (void)viewWillAppear:(BOOL)animated{\n    [super viewWillAppear:animated];\n    [self Reconnect];\n}\n#pragma mark - SRWebSocketDelegate\n- (void)webSocketDidOpen:(SRWebSocket *)webSocket{\n    NSLog(@"Websocket Connected");\n    self.title = @"Connected!";\n}\n\n- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error{\n    NSLog(@":( Websocket Failed With Error %@", error);\n    \n    self.title = @"Connection Failed! (see logs)";\n    self.webSocket = nil;\n}\n\n- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message{\n//    NSString *str1 = self.replyContent.text;\n//    NSString *str2 = [str1 stringByAppendingFormat:@"%@\\n",message];\n//    self.replyContent.text = str2;\n    JSQMessage *messageRc=[[JSQMessage alloc]initWithSenderId:@"twt" senderDisplayName:@"特瓦特" date:[NSDate date] text:(NSString*)message];\n    [self.model.messages addObject:messageRc];\n\n    [self finishSendingMessageAnimated:YES];\n}\n\n- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean{\n    NSLog(@"Closed Reason:%@",reason);\n    self.title = @"Connection Closed! (see logs)";\n    self.webSocket = nil;\n}\n\n- (void)webSocket:(SRWebSocket *)webSocket didReceivePong:(NSData *)pongPayload{\n    NSString *reply = [[NSString alloc] initWithData:pongPayload encoding:NSUTF8StringEncoding];\n    NSLog(@"%@",reply);\n}\n\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br"),n("span",{staticClass:"line-number"},[e._v("18")]),n("br"),n("span",{staticClass:"line-number"},[e._v("19")]),n("br"),n("span",{staticClass:"line-number"},[e._v("20")]),n("br"),n("span",{staticClass:"line-number"},[e._v("21")]),n("br"),n("span",{staticClass:"line-number"},[e._v("22")]),n("br"),n("span",{staticClass:"line-number"},[e._v("23")]),n("br"),n("span",{staticClass:"line-number"},[e._v("24")]),n("br"),n("span",{staticClass:"line-number"},[e._v("25")]),n("br"),n("span",{staticClass:"line-number"},[e._v("26")]),n("br"),n("span",{staticClass:"line-number"},[e._v("27")]),n("br"),n("span",{staticClass:"line-number"},[e._v("28")]),n("br"),n("span",{staticClass:"line-number"},[e._v("29")]),n("br"),n("span",{staticClass:"line-number"},[e._v("30")]),n("br"),n("span",{staticClass:"line-number"},[e._v("31")]),n("br"),n("span",{staticClass:"line-number"},[e._v("32")]),n("br"),n("span",{staticClass:"line-number"},[e._v("33")]),n("br"),n("span",{staticClass:"line-number"},[e._v("34")]),n("br"),n("span",{staticClass:"line-number"},[e._v("35")]),n("br"),n("span",{staticClass:"line-number"},[e._v("36")]),n("br"),n("span",{staticClass:"line-number"},[e._v("37")]),n("br"),n("span",{staticClass:"line-number"},[e._v("38")]),n("br"),n("span",{staticClass:"line-number"},[e._v("39")]),n("br"),n("span",{staticClass:"line-number"},[e._v("40")]),n("br"),n("span",{staticClass:"line-number"},[e._v("41")]),n("br"),n("span",{staticClass:"line-number"},[e._v("42")]),n("br"),n("span",{staticClass:"line-number"},[e._v("43")]),n("br"),n("span",{staticClass:"line-number"},[e._v("44")]),n("br"),n("span",{staticClass:"line-number"},[e._v("45")]),n("br"),n("span",{staticClass:"line-number"},[e._v("46")]),n("br"),n("span",{staticClass:"line-number"},[e._v("47")]),n("br"),n("span",{staticClass:"line-number"},[e._v("48")]),n("br"),n("span",{staticClass:"line-number"},[e._v("49")]),n("br"),n("span",{staticClass:"line-number"},[e._v("50")]),n("br")])]),n("p",[e._v("最后让我们来看一下model类")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('#import <Foundation/Foundation.h>\n#import "JSQMessages.h"\n@interface DataModel : NSObject\n/*\n *  这里放的都是JSQMessage对象 该对象有两个初始化方式 1.media or noMedia\n */\n\n@property (strong, nonatomic) NSMutableArray *messages; // message数组\n\n@property (strong, nonatomic) NSDictionary *avatars; // 聊天人所有头像\n\n@property (strong, nonatomic) JSQMessagesBubbleImage *outgoingBubbleImageData; // 发出去的气泡颜色\n\n@property (strong, nonatomic) JSQMessagesBubbleImage *incomingBubbleImageData; // 收到的气泡颜色\n\n@property (strong, nonatomic) NSDictionary *users; // 用户名字信息\n\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br")])]),n("p",[e._v("每一条消息是一个JSQMessage对象，可变数组messages存放的就是每一条消息的实例，通过websocket的收发消息的代理，动态向数组内添加实力，实现聊天功能。")]),e._v(" "),n("p",[e._v("最后效果是酱紫的：\n"),n("img",{attrs:{src:"http://i4.eiimg.com/1949/6d4e51821dfd47be.png",alt:"Markdown"}})]),e._v(" "),n("p",[n("img",{attrs:{src:"http://i4.eiimg.com/1949/eef5d6f24d2b0eca.png",alt:"Markdown"}})])])}],!1,null,null,null);s.default=t.exports}}]);